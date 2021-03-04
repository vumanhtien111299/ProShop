import './env.js'
import express from 'express'
import './mongoose.js'
import productRoutes from './routes/productRoutes.js'

const app = express()

app.get('/', (req, res) => {
    res.send("API is running...")
})

app.use('/api/products', productRoutes)


const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} node on port ${PORT}`))