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
    },
    avatar: {
        type: String,
        default: 'default_avatar.jpg',
    }
}, {
    timestamps: true
})

userSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compareSync(enteredPassword, this.password)
}

//just use function (error function can not use)
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    return next()
})


export const User = mongoose.model('User', userSchema)
