import express from 'express'
import productRoutes from './product.routes.js'
import userRoutes from './user.routes.js'

const router = express.Router()

export default (app) => {
    // Prefix path
    app.use('/api', router);

    router.get('/', (res, req) => res.send('Hello'))

    // Product routes
    productRoutes(router)

    //User routes
    userRoutes(router)

}
