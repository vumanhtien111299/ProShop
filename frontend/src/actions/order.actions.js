import axios from 'axios'
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS
} from "../constants/order.constants";

export const createOrder = (order) => async (dispatch) => {
    try {
        const userInfo = localStorage.getItem('userInfo');

        dispatch({ type: ORDER_CREATE_REQUEST })
        const config = {
            headers: {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(userInfo).accessToken}`
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
            type: ORDER_CREATE_FAIL,
            payload:
                error.response
                    && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        const userInfo = localStorage.getItem('userInfo');

        dispatch({ type: ORDER_DETAILS_REQUEST })
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(userInfo).accessToken}`
            }
        }
        // first layer data is from axios
        const { data: { data } } = await axios.get(`/api/orders/${id}`, config);
        console.log('cfg', data)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response
                    && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

