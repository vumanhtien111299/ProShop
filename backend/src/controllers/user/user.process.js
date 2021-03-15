import { User } from '../../models/userModel.js'
import { logger } from '../../utils/logger.js'
import { accessToken } from '../../utils/token.js';

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
        response.message = error
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
                statusCode: 400,
                message: 'User existed',
                data: {},
            };
        }
        console.log(data)
        const newUser = await User.create({
            name: data.name,
            email: data.email,
            password: data.password
        })

        response.data = {
            accessToken: accessToken(newUser._id),
            user: newUser,
        }
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error.message
    }
    return response
}

export const updateProfile = async (data) => {
    const response = {
        status: 200,
        message: 'Update User Profile success !',
        data: {}
    };
    try {
        const user = await User.findOne(data._id)
        console.log('user', user)

        if (user) {
            user.name = data.name || user.name
            user.email = data.email || user.email
            if (data.password) {
                user.password = data.password || user.password
            }

            const updateUser = await user.save()

            response.data = {
                user: {
                    _id: updateUser._id,
                    name: updateUser.name,
                    email: updateUser.email,
                    isAdmin: updateUser.isAdmin
                },
                accessToken: accessToken(updateUser._id)
            }

        } else {
            return {
                statusCode: 404,
                message: 'User not found !',
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

