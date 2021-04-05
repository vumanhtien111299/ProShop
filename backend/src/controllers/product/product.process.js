import { Product } from '../../models/product.model.js'
import { logger } from '../../utils/logger.js'
import md5 from 'md5'
import { uploadAWS } from '../../common/awn.js'
import { BUCKET, AWS_FOLDER } from '../../common/enum.js'
import { sanitizeUpdateData } from './product.validator.js'


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

export const adminCreateProduct = async (_id) => {
    const response = {
        status: 200,
        message: 'Create product success !',
        data: {}
    }
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


export const adminUpdateProduct = async (productId, data, file) => {
    const response = {
        status: 200,
        message: 'Update product success !',
        data: {}
    };
    try {
        console.log(file)
        const updateData = sanitizeUpdateData(data)
        const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, updateData, { new: true });
        if (!updatedProduct) {
            return {
                status: 404,
                message: 'Product not existed',
                data: {},
            };
        }
        updatedProduct.image = `${md5(Date.now())}.${md5(file.buffer)}.${file.originalname.split('.').pop()}`
        await uploadAWS(BUCKET, `${AWS_FOLDER.IMAGE}${updatedProduct.image}`, file.buffer)
        await updatedProduct.save()
        response.data = updatedProduct;
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error.message
    }
    return response
}

export const createProductReview = async (productId, bodyData) => {
    const response = {
        status: 200,
        message: 'Update product success !',
        data: {}
    };
    try {
        const product = await Product.findById({ _id: productId })
        if (!product) {
            return {
                status: 404,
                message: 'Product not existed',
                data: {},
            };
        } else {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user && r.user.toString() === bodyData.user.toString()
            )
            if (alreadyReviewed) {
                return {
                    status: 400,
                    message: 'Product already reviewed',
                    data: {},
                };
            }
            const review = {
                name: bodyData.name,
                rating: Number(bodyData.rating),
                comment: bodyData.comment,
                user: bodyData.user
            }
            product.reviews.push(review)

            product.numReview = product.reviews.length

            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
            await product.save()
        }

        response.data = product;
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error.message
    }
    return response
}
