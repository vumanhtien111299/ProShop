import axios from 'axios'
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS
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
        const { data: { data } } = await axios.post('/api/order', order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
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
