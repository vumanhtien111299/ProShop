import * as product from './product.process.js'
import { keywordData } from './product.validator.js'
import { Product } from '../../models/product.model.js'

export const List = async (req, res) => {
    try {
        const pageSize = 2
        const page = Number(req.query.pageNumber) || 1

        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {}

        const count = await Product.countDocuments({ ...keyword })
        const products = await Product.find({ ...keyword })
            .limit(pageSize)
            .skip(pageSize * (page - 1))

        res.json({ products, page, pages: Math.ceil(count / pageSize) })
    } catch (error) {
        res.status = 500
        res.message = error.message
    }
}

export const TopProducts = async (req, res) => {
    const { status, data } = await product.getTopProducts()

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


