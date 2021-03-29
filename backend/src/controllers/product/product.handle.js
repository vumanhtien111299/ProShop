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
    //if missing information, assign the current user information
    const updateData = {
        name: req.body.name || req.product.name,
        price: req.body.price || req.product.price,
        description: req.body.description || req.product.description,
        image: req.body.image || req.product.image,
        brand: req.body.brand || req.product.brand,
        category: req.body.category || req.product.category,
        countInStock: req.body.countInStock || req.product.countInStock
    }
    const { status, message, data } = await product.adminUpdateProduct({ _id: req.params.id, data: updateData })

    return res.status(status).send({ status, message, data })
}
