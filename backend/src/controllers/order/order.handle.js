import * as order from './order.process.js'

export const addOrderItems = async (req, res) => {
    const { status, message, data } = await order.createOrder(req.user, req.body)

    return res.status(status).send({ status, message, data })
}

export const getOderItems = async (req, res) => {
    const { status, message, data } = await order.getOrderByItem(req.params.id)

    return res.status(status).send({ status, message, data })
}
