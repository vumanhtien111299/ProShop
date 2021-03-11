import jwt from 'jsonwebtoken'
import { User } from '../../models/userModel.js'
export const verifyToken = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findOne({ _id: decoded._id }).select('-password')
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
