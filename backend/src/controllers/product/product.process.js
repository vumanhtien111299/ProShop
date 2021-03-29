import { Product } from '../../models/product.model.js'
import { logger } from '../../utils/logger.js'


export const ListProduct = async (filter = {}) => {
    const response = {
        status: 200,
        message: 'Showing list Product',
        data: {}
    };
    try {
        const products = await Product.find(filter)
        response.data = products || []

        logger.success('Get List success')
        // logger.log(products)
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error.message

    }
    return response
}

export const ProductDetail = async (id) => {
    const response = {
        status: 200,
        message: 'Showing Detail Product',
        data: {}
    }
    try {
        const products = await Product.findById(id)
        response.data = products || []
        if (products) {
            logger.success('Get Detail Product Success')
            logger.log(products)
        } else {
            return {
                status: 404,
                message: 'Product not found!!',
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

export const DeleteProductById = async (id) => {
    const response = {
        status: 200,
        message: 'Delete product successful !!',
        data: {}
    };
    try {
        const product = await Product.findById(id)
        if (product) {
            await product.remove()
            response.data = { message: 'Product removed' }
        } else {
            return {
                status: 404,
                message: 'Product not found!!',
                data: {}
            }
        }
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error
    }
    return response
}

export const adminCreateProduct = async (_id, data) => {
    const response = {
        status: 200,
        message: 'Create product success !',
        data: {}
    };
    try {
        const newProduct = await Product.create({
            name: 'Sample name',
            price: 0,
            user: _id,
            image: '/images/sample.jpg',
            brand: 'Sample brand',
            category: 'Sample category',
            countInStock: 0,
            numReviews: 0,
            description: 'Sample description'
        })

        response.data = newProduct
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error.message
    }
    return response
}


export const adminUpdateProduct = async (_id, data) => {
    const response = {
        status: 200,
        message: 'Update product success !',
        data: {}
    };
    try {
        const updatedProduct = await Product.findOneAndUpdate({ _id }, data, { new: true });
        if (!updatedProduct) {
            return {
                status: 404,
                message: 'Product not existed',
                data: {},
            };
        }

        response.data = updatedProduct;
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error.message
    }
    return response
}
