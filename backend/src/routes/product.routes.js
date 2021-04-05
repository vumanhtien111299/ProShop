import express from 'express'
import multer from 'multer'
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

    //@desc   Create a product
    //@route  Post /api/products
    //@desc   Private/Admin
    router.post('/', authentication.verifyToken, authentication.admin, product.createProduct)

    //@desc   Update a product
    //@route  Put /api/products/:id
    //@desc   Private/Admin
    router.put('/:id', authentication.verifyToken, authentication.admin, multer({}).single('image'), product.updateProduct)

    //@desc   Create new a reviews
    //@route  POST /api/products/:id
    //@desc   Private/Admin
    router.post('/:id/reviews', authentication.verifyToken, product.createNewReview)

}
