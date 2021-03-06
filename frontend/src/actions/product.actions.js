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
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_STATISTIC_REQUEST,
    PRODUCT_STATISTIC_SUCCESS,
    PRODUCT_STATISTIC_FAIL
} from '../constants/product.constants.js'
import { logout } from './user.actions.js'


export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

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
        const { data } = await axios.post(`/api/products`, {}, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        // const message = error.response?.data?.message || error.message
        // if (message === 'Not authorized, token failed') {
        //     dispatch(logout())
        // }
        // dispatch({
        //     type: PRODUCT_CREATE_FAIL,
        //     payload: message
        // })
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response?.data?.message || error.message,
        })
    }
}

export const updateProduct = (product) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: PRODUCT_UPDATE_REQUEST })

        const dataImage = new FormData()
        dataImage.append('image', product.image)
        dataImage.append('name', product.name)
        dataImage.append('brand', product.brand)
        dataImage.append('category', product.category)
        dataImage.append('description', product.description)
        dataImage.append('price', product.price)
        dataImage.append('countInStock', product.countInStock)

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
        // first layer data is from axios
        const { data: { data } } = await axios.put(`/api/products/${product._id}`, dataImage, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = error.response?.data?.message || error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
        // first layer data is from axios
        await axios.post(`/api/products/${productId}/reviews`, review, config)

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })
    } catch (error) {
        const message = error.response?.data?.message || error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: message
        })
    }
}


export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })

        const { data } = await axios.get(`/api/products/top`)

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload:
                error.response
                    && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const StatisticProducts = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: PRODUCT_STATISTIC_REQUEST })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(`/api/products/statistic`, config)

        dispatch({
            type: PRODUCT_STATISTIC_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_STATISTIC_FAIL,
            payload:
                error.response
                    && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
