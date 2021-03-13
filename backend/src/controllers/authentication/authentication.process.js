import { User } from "../../models/userModel.js"
import { accessToken } from "../../utils/token.js"

export const checkUserLogin = async ({ email, password }) => {
    const response = {
        status: 200,
        message: 'login Success !',
        data: {}
    }

    try {
        const user = await User.findOne({ email })
        console.log(user)

        if (user && (await user.matchPassword(password))) {
            response.data = {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                },
                accessToken: accessToken(user._id)
            }
        } else {
            res.status(401)
            throw new Error('Invalid email or password')
        }
    } catch (error) {
        response.status = 500
        response.message = error
    }
    return response
}
