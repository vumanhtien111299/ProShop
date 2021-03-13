import express from 'express'
import *  as User from '../controllers/user/user.handle.js'
import * as authentication from '../controllers/authentication/authentication.handle.js'

const router = express.Router()

export default (prefix) => {
    // Prefix path
    prefix.use('/users', authentication.verifyToken, router);

    router.get('/profile', User.GetProfileUser)
}
