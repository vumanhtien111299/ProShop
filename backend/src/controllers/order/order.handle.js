import * as order from './order.process.js'
import { queryBuilder } from './order.validate.js'

export const addOrderItems = async (req, res) => {
    const { status, message, data } = await order.createOrder(req.user, req.body)

    return res.status(status).send({ status, message, data })
}

export const getOderItems = async (req, res) => {
    const { status, message, data } = await order.getOrderByItem(req.params.id)

    return res.status(status).send({ status, message, data })
}

export const updateOrderToPay = async (req, res) => {
    const updateData = {
        isPaid: true,
        paidAt: new Date(),
        paymentResult: {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
    }

    const { status, message, data } = await order.updateOrder(req.params.id, updateData)
    return res.status(status).send({ status, message, data })
}

export const updateOrderToDelivered = async (req, res) => {
    const updateData = {
        isDelivered: true,
        deliveredAt: new Date(),
    }

    const { status, message, data } = await order.updateOrderDelivered(req.params.id, updateData)
    return res.status(status).send({ status, message, data })
}

export const getListOrder = async (req, res) => {
    const filter = queryBuilder(req.query)
    const { status, message, data } = await order.getListOrderFilter(filter)

    return res.status(status).send({ status, message, data })
}
