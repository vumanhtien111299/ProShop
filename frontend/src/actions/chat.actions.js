import axios from 'axios'
import {
    GET_MESSAGES_FAIL,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGE_AFTER_SEND
} from '../constants/chat.constants.js'

export const getMessage = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwt')

        dispatch({ type: GET_MESSAGES_REQUEST })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
        // first layer data is from axios
        const { data } = await axios.get(`/api/chat/get-message`, config)
        const { message } = data
        console.log(message)
        dispatch({
            type: GET_MESSAGES_SUCCESS,
            payload: { message },
        })
    } catch (error) {
        dispatch({
            type: GET_MESSAGES_FAIL,
            payload: error.response?.data?.message || error.message,
        })
    }
}

export const afterSendMessage = (msg) => {
    return async dispatch => {
        dispatch({
            type: GET_MESSAGE_AFTER_SEND,
            payload: msg
        })
    }
}
