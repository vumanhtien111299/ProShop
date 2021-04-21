import {
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,
    GET_MESSAGE_AFTER_SEND
} from '../constants/chat.constants.js'

export const chatReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
        case GET_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.payload.message,
                loading: false
            }
        case GET_MESSAGES_FAIL:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        case GET_MESSAGE_AFTER_SEND:
            console.log(action.payload)
            console.log(state.messages.concat(action.payload))
            return {
                ...state,
                messages: state.messages.concat(action.payload),
                loading: false
            }
        default:
            return state
    }
}
