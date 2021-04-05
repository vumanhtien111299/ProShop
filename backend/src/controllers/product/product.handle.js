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

export const createProduct = async (req, res) => {
    const { status, message, data } = await product.adminCreateProduct({ _id: req.user._id })

    return res.status(status).send({ status, message, data })
}

export const updateProduct = async (req, res) => {
    const { status, message, data } = await product.adminUpdateProduct(req.params.id, req.body, req.file)

    return res.status(status).send({ status, message, data })
}

export const createNewReview = async (req, res) => {
    const dataCreate = {
        name: req.user.name,
        rating: req.body.rating,
        comment: req.body.comment,
        user: req.user._id
    }
    const { status, message, data } = await product.createProductReview(req.params.id, dataCreate)

    return res.status(status).send({ status, message, data })
}


