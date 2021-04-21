import express from 'express'
import * as chat from '../controllers/chat/chat.js'
import * as authentication from '../controllers/authentication/authentication.handle.js'

const router = express.Router()

export default (prefix) => {
    // Prefix path
    prefix.use('/chat', router)

    router.get('/get-message', authentication.verifyToken, chat.getMessage)
}
