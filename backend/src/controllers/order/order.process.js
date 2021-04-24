import { mailer } from '../../common/mailer.js'
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
        console.log(user)
        await mailer({
            email: user.email,
            subject: 'Detail Order',
            content: `<p>Order Items: ${OrderItems.map((order) => (
                `
                <h2>Name: ${order.name}</h2>
                <br>
                <h2>QTY: ${order.qty}</h2>
                <br>
                <h2>Image: ${order.image}</h2>
                <br>
                <h2>Price: ${order.price}</h2>
                <br>
                <h2>Product: ${order.product}</h2>
             `
            ))}</p>`
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

export const updateOrder = async (orderId, data) => {
    const response = {
        status: 200,
        message: 'Update order successful',
        data: {}
    }

    try {
        const order = await Order.findOneAndUpdate({ _id: orderId }, data, { new: true })
        if (order) {
            response.data = order
        } else {
            return {
                status: 400,
                message: 'Order not found',
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

export const updateOrderDelivered = async (orderId, data) => {
    const response = {
        status: 200,
        message: 'Update order successful',
        data: {}
    }

    try {
        const order = await Order.findOneAndUpdate({ _id: orderId }, data, { new: true })
        if (order) {
            response.data = order
        } else {
            return {
                status: 400,
                message: 'Order not found',
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

export const getListOrderFilter = async (filter = {}) => {
    const response = {
        status: 200,
        message: 'Get List Order Successful',
        data: {}
    }

    try {
        const order = await Order.find(filter).populate({ path: 'user', select: 'name email' })

        response.data = order
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error.message
    }

    return response;
}
