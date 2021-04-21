import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    receiver: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    }
}, { timestamps: true })

export const Chat = mongoose.model('Chat', chatSchema)

