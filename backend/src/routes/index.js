import express from 'express'
import productRoutes from './product.routes.js'
import userRoutes from './user.routes.js'
import orderRoutes from './order.routes.js'
import uploadRoutes from './upload.routes.js'
import chatRoutes from './chat.routes.js'
import *  as User from '../controllers/user/user.handle.js'
import * as authentication from '../controllers/authentication/authentication.handle.js'


const router = express.Router()

export default (app) => {
    // Prefix path
    app.use('/api', router);

    router.get('/', (req, res) => res.send('Welcome to ProShop...'));
    router.get('/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

    // Product routes
    productRoutes(router)

    //User routes
    userRoutes(router)

    //Order routes
    orderRoutes(router)

    //Upload routes
    uploadRoutes(router)

    //Chat routes
    chatRoutes(router)

    // @desc Login
    // @route POST /login
    // @access Public
    router.post('/login', authentication.login)

    // @desc Register
    // @route POST /register
    // @access Public
    router.post('/register', User.register)
}
