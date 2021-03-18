import express from 'express'
import * as authentication from '../controllers/authentication/authentication.handle.js'
import * as order from '../controllers/order/order.handle.js'


const router = express.Router()

export default (prefix) => {
    // Prefix path
    prefix.use('/order', authentication.verifyToken, router)

    // @desc Create new order
    // @route POST /order
    // @access Bearer Authentication
    router.post('/', order.addOrderItems);

    // @desc Update user profile
    // @route PUT /users/profile
    // @access Bearer Authentication
    // router.put('/profile/:id', user.updateProfile);
}
