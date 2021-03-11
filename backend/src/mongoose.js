import mongoose from 'mongoose'
import chalk from 'chalk'

const conditional = {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.MONGODB_URI, conditional)

mongoose.connection.on('connected', function () {
    console.log(`${chalk.green('*Success!!**')} MongoDB connected!!!`)
})

mongoose.connection.on('error', error => {
    console.error(error)
    console.log(`${chalk.red('*Error!**')} MongoDB connection error!! Please make sure MongoDB is running!!`)
    process.exit()
})
