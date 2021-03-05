
import './env.js'
import users from './data/users.js'
import products from './data/products.js'
import chalk from 'chalk'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import './mongoose.js'

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })

        console.log('-----sam', sampleProducts)
        await Product.create(sampleProducts)

        console.log(`${chalk.green('Data Imported')}`)
    } catch (error) {
        console.log(error)
        console.log(`${chalk.red('Error')}`)
        process.exit(1)
    }

}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log(`${chalk.red('Data Destroyed !!')}`)
        process.exit()
    } catch (error) {
        console.log('-d----error', error)
        console.log(`${chalk.red('Error')}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
