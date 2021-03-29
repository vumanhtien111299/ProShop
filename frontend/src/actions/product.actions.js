import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL
} from '../constants/product.constants.js'
import { logout } from './user.actions.js'


export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get('/api/products')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response
                    && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response
                    && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: PRODUCT_DELETE_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };
        // first layer data is from axios
        await axios.delete(`/api/products/${id}`, config)

        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response?.data?.message || error.message,
        })
    }
}

export const createProduct = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: PRODUCT_CREATE_REQUEST })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        // first layer data is from axios
        const { data: { data } } = await axios.post(`/api/products`, {}, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        const message = error.response?.data?.message || error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message
        })
    }
}
