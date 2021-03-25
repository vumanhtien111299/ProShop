import * as product from './product.process.js'

export const List = async (req, res) => {
    const { data, status } = await product.ListProduct()

    return res.status(status).send(data)
}

export const ProductsDetail = async (req, res) => {
    const { data, status } = await product.ProductDetail(req.params.id)

    return res.status(status).send(data)
}

export const deleteProduct = async (req, res) => {
    const { status, message, data } = await product.DeleteProductById(req.params.id)

    return res.status(status).send({ status, message, data })
}
