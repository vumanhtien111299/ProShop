import { Product } from '../../models/product.model.js'
import { logger } from '../../utils/logger.js'
import md5 from 'md5'
import { uploadAWS } from '../../common/awn.js'
import { BUCKET, AWS_FOLDER } from '../../common/enum.js'
import { sanitizeUpdateData } from './product.validator.js'
import { Order } from '../../models/order.model.js'

// export const ListProduct = async (filter = {}, limit, skip) => {
//     const response = {
//         status: 200,
//         message: 'Showing list Product',
//         data: {}
//     };
//     try {
//         const filterProduct = {
//             ...filter,
//             isDeleted: false,
//         }
//         const total = await Product.countDocuments(filterProduct)
//         console.log('----total---', total)

//         const products = await Product.find(filterProduct)
//             .limit(limit)
//             .skip(skip)
//         console.log('---products---', products)
//         if (limit === -1) {
//             const fullProducts = await Product.find(filterProduct)
//             console.log('---fullProducts---', fullProducts)


//             response.data = {
//                 total: fullProducts.length,
//                 limit: 0,
//                 skip: 0,
//                 totalPage: 1,
//                 fullProducts
//             }
//         } else {
//             response.data = {
//                 total,
//                 limit,
//                 skip,
//                 totalPage: Math.ceil(total / limit),
//                 products,
//             }
//         }

//         logger.success('Get List success')
//     } catch (error) {
//         logger.fail(error.message)

//         response.status = 500
//         response.message = error.message

//     }
//     return response
// }

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

export const getTopProducts = async () => {
    const response = {
        status: 200,
        message: 'Get top product success !',
        data: {}
    };
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(3)

        if (products) {
            response.data = { message: 'Get Top Product Success' }
        } else {
            return {
                status: 404,
                message: 'Product not found!!',
                data: {}
            }
        }

        response.data = products;
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error.message
    }
    return response
}

export const getStatisticService = async () => {
    const response = {
        status: 200,
        message: 'Get top product success !',
        data: {}
    };
    try {
        const topRating = await Product.find({}).sort({ rating: -1 }).limit(5)
        const topOrder = await Order.aggregate([
            { $unwind: '$OrderItems' },
            { $lookup: { from: 'products', localField: 'OrderItems.product', foreignField: '_id', as: 'product_info' } },
            { $unwind: '$product_info' },
            {
                $group: {
                    _id: { productId: '$OrderItems.product', 'productName': '$product_info.name' }, count: { $sum: 1 },
                }
            },
            { $sort: { 'count': -1 } }
        ])
        response.data = { topRating, topOrder }
    } catch (error) {
        response.status = 500
        response.message = error.message
    }
    return response
}
