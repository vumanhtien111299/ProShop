import { Order } from '../../models/order.model.js'
import { logger } from '../../utils/logger.js'

export const createOrder = async (user, data) => {
    const response = {
        status: 200,
        message: 'Create order successful',
        data: {}
    }

    try {
        const { OrderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = data
        if (!OrderItems && !OrderItems.length) {
            return {
                status: 400,
                message: 'No items order',
                data: {}
            }
        }

        const order = new Order({
            OrderItems,
            user: user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        response.data = await order.save()
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error.message
    }
    return response
}

export const getOrderByItem = async (id) => {
    const response = {
        status: 200,
        message: 'Get order successful',
        data: {}
    }

    try {
        const order = await Order.findById(id).populate({ path: 'user', select: 'name email' });
        if (order) {
            response.data = order
        } else {
            return {
                status: 400,
                message: 'No items order',
                data: {}
            }
        }
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error.message
    }
    return response
}
