import express from 'express'
import * as authentication from '../controllers/authentication/authentication.handle.js'
import * as order from '../controllers/order/order.handle.js'


const router = express.Router()

export default (prefix) => {
    // Prefix path
    prefix.use('/orders', authentication.verifyToken, router)

    // @desc Create new order
    // @route POST /order
    // @access Bearer Authentication
    router.post('/', order.addOrderItems)

    // @desc Get order
    // @route Get /order/:id
    // @access Bearer Authentication
    router.get('/:id', order.getOderItems)

    // @desc Get list order
    // @route GET /order/
    // @access Bearer Authentication
    router.get('/', order.getListOrder)

    // @desc Update an order to paid
    // @route PUT /order/:id/pay
    // @access Bearer Authentication
    router.put('/:id/pay', order.updateOrderToPay);
}
