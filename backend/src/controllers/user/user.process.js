import { User } from '../../models/userModel.js'
import { logger } from '../../utils/logger.js'

export const get = async (filter = {}) => {
    const response = {
        status: 200,
        message: 'Get user successful !!',
        data: {}
    };
    try {
        const user = await User.find(filter).select('-password')
        response.data = user
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = 'Get User successful'
    }
    return response
}


export const createNewUser = async (data) => {
    const response = {
        status: 200,
        message: 'Register User success !',
        data: {}
    };
    try {
        const user = await User.findOne({
            email: data.email,
        })
        if (user) {
            return {
                status: 200,
                message: 'Register User success !',
                data: {}
            };
        }

        const newUser = await User.create({
            name: data.name,
            email: data.email,
            password: data.password
        })

        response.data = newUser
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error.message
    }
    return response
}

