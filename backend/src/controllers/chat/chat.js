import { Chat } from '../../models/chat.model.js'

export const getMessage = async (req, res) => {
    try {
        const message = await Chat.aggregate([
            { $lookup: { from: 'users', localField: 'sender', foreignField: '_id', as: 'sender' } },
            { $lookup: { from: 'users', localField: 'receiver', foreignField: '_id', as: 'receiver' } },
            { $unwind: "$sender" },
            { $unwind: "$receiver" },
        ])
        res.status(200).json({ message })
    } catch (error) {
        console.log(error)
    }
}
