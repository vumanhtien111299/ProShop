import * as user from './user.process.js'

export const Login = async (req, res) => {
    const { data, message, status } = await user.UserLogin(req.body)

    return res.status(status).send({ status, message, data })
}

export const GetProfileUser = async (req, res) => {
    // const { data, message, status } = await user.GetProfile(req.body)

    return res.status(200).send(req.user)
}
