import express from 'express'
import *  as product from '../controllers/product/product.handle.js'

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

}
