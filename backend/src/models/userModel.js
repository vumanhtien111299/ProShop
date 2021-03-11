import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

userSchema.pre('save', async (next) => {
    const user = this
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(user.password, salt)

        user.password = password
        return next()
    }
})

userSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compareSync(enteredPassword, this.password)
}


export const User = mongoose.model('User', userSchema)
