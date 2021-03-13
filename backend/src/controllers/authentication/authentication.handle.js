import { checkUserLogin } from './authentication.process.js'
import jwt from 'jsonwebtoken'
import { User } from '../../models/userModel.js'
export const verifyToken = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1]
            console.log('----token----', token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log('----decoded----', decoded)
            const user = await User.findOne({ _id: decoded._id }).select('-password')
            console.log('----user---', user)
            if (!user) {
                return res.status(401).send({ status: 401, message: 'Unauthorized1', data: {} })
            }
            req.user = user
            return next()
        }
        return res.status(401).send({ status: 401, message: 'Unauthorized2', data: {} })
    } catch (error) {
        return res.status(401).send({ status: 401, message: 'Unauthorized3', data: {} })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    const { status, message, data } = await checkUserLogin({ email, password })
    return res.status(status).send({ status, message, data })

}
