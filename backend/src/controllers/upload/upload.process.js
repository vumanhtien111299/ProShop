import md5 from 'md5'
import { uploadAWS } from '../../common/awn.js'
import { BUCKET, AWS_FOLDER } from '../../common/enum.js'
import { Product } from '../../models/product.model.js'
import { logger } from '../../utils/logger.js'


export const uploadService = async ({ Id, file }) => {
    const response = {
        status: 200,
        message: 'Upload image successful !',
        data: {}
    }
    try {
        const product = await Product.findOne({ _id: Id, isDeleted: false })
        if (!product) {
            return {
                statusCode: 404,
                message: 'Image not found',
                data: {},
            };
        }
        product.image = `${md5(Date.now())}.${md5(file.buffer)}.${file.originalname.split('.').pop()}`
        await uploadAWS(BUCKET, `${AWS_FOLDER.IMAGE}${product.image}`, file.buffer)
        await product.save()
        response.data = file.originalname
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error.message
    }
    return response
}
