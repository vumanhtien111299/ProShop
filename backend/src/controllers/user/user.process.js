import { User } from '../../models/userModel.js'
import generateToken from '../../utils/generate.token.js'
import { logger } from '../../utils/logger.js'

//@desc   Auth user & get token
//@route  POST /api/products
//@desc   Public
export const UserLogin = async (body) => {
    const response = {
        status: 200,
        message: 'User login success !',
        data: {}
    };
    try {
        const user = await User.findOne({ email: body.email })
        const isValidPassword = await user.matchPassword(body.password)
        if (user && isValidPassword) {
            response.data = {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                },
                token: generateToken(user._id)
            }
        } else {
            response.status = 401
            response.message = 'Invalid email and password'
        }

        logger.success('User Login success')
        // logger.log(products)
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error.message
    }
    return response
}


//@desc   Get user profile
//@route  POST /api/users/profile
//@desc   Private
export const GetProfile = async (body) => {
    const response = {
        status: 200,
        message: 'Get User Profile success !',
        data: {}
    };
    try {
        const user = await User.findById({ id: body._id })
        const isValidPassword = await user.matchPassword(body.password)
        if (user && isValidPassword) {
            response.data = {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                },
                token: generateToken(user._id)
            }
            console.log(response)

        } else {
            response.status = 401
            response.message = 'Invalid email and password'
        }

        logger.success('User Login success')
        // logger.log(products)
    } catch (error) {
        logger.fail(error.message)

        response.status = 500
        response.message = error.message
    }
    return response
}

