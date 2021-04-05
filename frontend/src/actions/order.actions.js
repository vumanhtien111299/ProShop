import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
} from "../constants/order.constants";

export const createOrder = (order) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: ORDER_CREATE_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }

        // first layer data is from axios
        const { data: { data } } = await axios.post('/api/orders', order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response?.data?.message || error.message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: ORDER_DETAILS_REQUEST })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        // first layer data is from axios
        const { data: { data } } = await axios.get(`/api/orders/${id}`, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response?.data?.message || error.message,
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: ORDER_PAY_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };
        // first layer data is from axios
        const { data: { data } } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response?.data?.message || error.message,
        })
    }
}

export const deliverOrder = (order) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: ORDER_DELIVER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };
        // first layer data is from axios
        const { data: { data } } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config);

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response?.data?.message || error.message,
        })
    }
}


export const listMyOrders = () => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('jwt');

        const { userLogin: { userInfo } } = getState();
        dispatch({ type: ORDER_LIST_MY_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };
        // first layer data is from axios
        const { data: { data } } = await axios.get(`/api/orders?user=${userInfo._id}`, config)

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response?.data?.message || error.message,
        })
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('jwt');

        dispatch({ type: ORDER_LIST_REQUEST })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        // first layer data is from axios
        const { data: { data } } = await axios.get(`/api/orders`, config)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        })
    }
}
