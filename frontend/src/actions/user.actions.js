import axios from 'axios'
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS
} from "../constants/user.constants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'content-Type': 'application/json'
            }
        }

        const { data: { data: { user, accessToken } } } = await axios.post(
            '/api/login',
            { email, password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: user
        })

        localStorage.setItem('userInfo', JSON.stringify(user));
        localStorage.setItem('jwt', accessToken);
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response
                    && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })

        const config = {
            headers: {
                'content-Type': 'application/json'
            }
        }

        const { data: {
            data: {
                user,
                accessToken
            }
        } } = await axios.post(
            '/api/register',
            { name, email, password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: user
        })

        // after register then login
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: user
        })

        localStorage.setItem('userInfo', JSON.stringify({ user, accessToken }))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response
                    && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: USER_DETAILS_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const { data: { data } } = await axios.get(`/api/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response
                    && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        const { data: { data } } = await axios.put(`/api/users/profile/${user._id}`, user, config)

        // set user login again to get the new data from other component using userLogin.userInfo
        // ex: header
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        // same to user detail
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response
                    && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
