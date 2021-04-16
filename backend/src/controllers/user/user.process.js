import { User } from '../../models/user.model.js'
import { logger } from '../../utils/logger.js'
import { accessToken } from '../../utils/token.js'
import { BUCKET, AWS_FOLDER } from '../../common/enum.js'
import { uploadAWS } from '../../common/awn.js'
import md5 from 'md5'


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

export const uploadUserAvatar = async ({ userId, avatar }) => {
    const response = {
        status: 200,
        message: 'Upload avatar successful',
        data: {},
    };

    try {
        const user = await User.findOne({ _id: userId })
            .select('email profile createdAt')
        // .populate({ path: 'profile.faculty', select: 'name isActive isDeleted' })
        if (!user) {
            return {
                status: 404,
                message: 'User not found',
                data: {},
            }
        }

        // avatarPath: first-lastName.hash(date).mimetype
        user.avatar = `${md5(Date.now())}.${md5(avatar.buffer)}.${avatar.originalname.split('.').pop()}`
        await uploadAWS(BUCKET, `${AWS_FOLDER.IMAGE}${user.avatar}`, avatar.buffer)

        response.data = await user.save()
    } catch (err) {
        response.status = 500
        response.message = err.message
    }

    return response
}
