import axios from 'axios'
import imageCompression from 'browser-image-compression'
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
} from "../constants/user.constants"
import { ORDER_CREATE_RESET, ORDER_LIST_MY_RESET } from '../constants/order.constants.js'
import qs from 'qs'
import { CART_RESET_ITEM } from '../constants/cart.constants'

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
    localStorage.removeItem('jwt')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('shippingAddress')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET })
    dispatch({ type: CART_RESET_ITEM })
    dispatch({ type: ORDER_CREATE_RESET })
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

export const uploadUserAvatarAction = ({ id, file }) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
        const token = localStorage.getItem('jwt')

        const uploadAvatar = await imageCompression(file, {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        });

        const payload = new FormData();
        payload.append('avatar', uploadAvatar);

        const { data: { data } } = await axios.post(`/api/users/${id}/avatar`, payload, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('user', JSON.stringify(data));

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
}

export const listUsers = (filter) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: USER_LIST_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
        const query = qs.stringify(filter);
        let endpoint = `/api/users`
        if (query) {
            endpoint += `?${query}`;
        }
        const { data } = await axios.get(endpoint, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response
                    && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST })

        const token = localStorage.getItem('jwt');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }

        await axios.delete(`/api/users/${id}`, config)

        dispatch({ type: USER_DELETE_SUCCESS })
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response
                    && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateUser = (user) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })

        const token = localStorage.getItem('jwt');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        const { data } = await axios.put(`/api/users/${user._id}`, user, config)

        dispatch({ type: USER_UPDATE_SUCCESS })
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response
                    && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
