import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
const router = express.Router()

//@desc   Fetch all products
//@route  GET /api/products
//@desc   Fetch all products


router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)

}))

//@desc   Fetch all products
//@route  GET /api/products
//@desc   Fetch all products

router.get('/:id', asyncHandler(async (req, res) => {
    const products = await Product.findById(req.params.id)

    if (products) {
        res.json(products)
    } else {
        res.status(400)
        throw new Error('Product not found')
    }
}))

export default router