import * as user from './user.process.js'

export const getProfileUser = async (req, res) => {
    return res.status(200).send({ status: 200, message: 'Get user successful !', data: user.get })
}

export const register = async (req, res) => {
    const { status, message, data } = await user.createNewUser(req.body)

    return res.status(status).send({ status, message, data })
}

export const updateUserProfile = async (req, res) => {
    const { status, message, data } = await user.updateProfile(req.body)

    return res.status(status).send({ status, message, data })
}
