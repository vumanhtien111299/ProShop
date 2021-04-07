import { User } from '../../models/user.model.js'
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
                status: 400,
                message: 'User existed',
                data: {},
            };
        }
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

export const updateUser = async ({ _id, data }) => {
    const response = {
        status: 200,
        message: 'Update user successful',
        data: {},
    };

    try {
        if (data.email) {
            const user = await User.findOne({ email: data.email });
            if (user) {
                return {
                    status: 400,
                    message: 'Email existed',
                    data: {},
                };
            }
        }

        const updatedUser = await User.findOneAndUpdate({ _id }, data, { new: true });
        if (!updatedUser) {
            return {
                status: 404,
                message: 'User not existed',
                data: {},
            };
        }

        response.data = updatedUser;
    } catch (error) {
        response.status = 500;
        response.message = error.message;
    }

    return response;
};

export const DeleteUserById = async (id) => {
    const response = {
        status: 200,
        message: 'Delete user successful !!',
        data: {}
    };
    try {
        const user = await User.findById(id)
        if (user) {
            await user.remove()
            response.data = { message: 'User removed' }
        } else {
            return {
                status: 404,
                message: 'User not found!!',
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

export const getUser = async (id) => {
    const response = {
        status: 200,
        message: 'Get user successful !!',
        data: {}
    };
    try {
        const user = await User.findById(id).select('-password')
        if (user) {
            response.data = user
        } else {
            return {
                status: 404,
                message: 'User not found!!',
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

export const updateUserId = async ({ _id, data }) => {
    const response = {
        status: 200,
        message: 'Update user successful',
        data: {},
    };

    try {
        // if (data.email) {
        //     const user = await User.findOne({ email: data.email });
        //     if (user) {
        //         return {
        //             status: 400,
        //             message: 'Email existed',
        //             data: {},
        //         };
        //     }
        // }

        const updatedUser = await User.findOneAndUpdate({ _id }, data, { new: true });
        if (!updatedUser) {
            return {
                status: 404,
                message: 'User not existed',
                data: {},
            };
        }

        response.data = updatedUser;
    } catch (error) {
        response.status = 500;
        response.message = error.message;
    }

    return response;
}
