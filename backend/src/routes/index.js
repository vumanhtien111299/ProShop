import express from 'express'
import productRoutes from './product.routes.js'
import userRoutes from './user.routes.js'
import *  as User from '../controllers/user/user.handle.js'
import * as authentication from '../controllers/authentication/authentication.handle.js'


const router = express.Router()

export default (app) => {
    // Prefix path
    app.use('/api', router);

    // Product routes
    productRoutes(router)

    //User routes
    userRoutes(router)

    // @desc Login
    // @route POST /login
    // @access Public
    router.post('/login', authentication.login)

    // @desc Register
    // @route POST /register
    // @access Public
    router.post('/register', User.register)
}
