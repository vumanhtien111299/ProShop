import { createOrder } from './order.process.js'

export const addOrderItems = async (req, res) => {
    const { status, message, data } = await createOrder(req.user, req.body)

    return res.status(status).send({ status, message, data })
}
