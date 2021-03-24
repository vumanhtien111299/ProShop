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

