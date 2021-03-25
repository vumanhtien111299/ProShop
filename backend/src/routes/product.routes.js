import express from 'express'
import *  as product from '../controllers/product/product.handle.js'
import * as authentication from '../controllers/authentication/authentication.handle.js'


const router = express.Router()

export default (prefix) => {
    //prefix path
    prefix.use('/products', router)

    //@desc   Fetch all products
    //@route  GET /api/products
    //@desc   Fetch all products
    router.get('/', product.List)

    //@desc   Fetch all products
    //@route  GET /api/products
    //@desc   Fetch all products
    router.get('/:id', product.ProductsDetail)

    //@desc   Delete a product
    //@route  Delete /api/products/:id
    //@desc   Private/Admin
    router.delete('/:id', authentication.verifyToken, authentication.admin, product.deleteProduct)

}
