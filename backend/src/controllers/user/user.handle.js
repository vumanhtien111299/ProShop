import * as user from './user.process.js'

export const getProfileUser = async (req, res) => {
    return res.status(200).send({ status: 200, message: 'Get user successful !', data: req.user })
}

export const register = async (req, res) => {
    const { status, message, data } = await user.createNewUser(req.body)

    return res.status(status).send({ status, message, data })
}

export const updateUserProfile = async (req, res) => {
    //if missing information, assign the current user information
    const updateData = {
        name: req.body.name || req.user.name,
        email: req.body.email || req.user.email,
        password: req.body.password = req.user.password

    }

    const { status, message, data } = await user.updateUser({ _id: req.params.id, data: updateData })

    return res.status(status).send({ status, message, data })
}
