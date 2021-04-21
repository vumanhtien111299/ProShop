import app from './src/app.js';
import http from 'http';
import cors from "cors"
// import router from './src/routes'
import { logger } from './src/utils/logger.js';
import { notFound, errorHandler } from './src/middleware/error.middleware.js'
import { Server } from 'socket.io';
import { Chat } from './src/models/chat.model.js'


const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
    }
})


// Policy config
app.use(cors())
app.use(notFound)
app.use(errorHandler)
// app.use(router)

io.on("connection", (socket) => {
    console.log("We have a new connection!!!");


    socket.on('room', (room) => {
        socket.join(room);
    });
    socket.on('sendMessage', async (data) => {
        const chat = await Chat.create({
            sender: data.sender,
            message: data.message,
            receiver: data.receiver
        })

        const messages = await chat
            .populate({ path: 'sender', select: 'name avatar' })
            .populate({ path: 'receiver', select: 'name avatar' })
            .execPopulate()

        const room = 'ProShop-VMT'
        io.to(room).emit('Output chat message', messages)
        console.log(messages)
    })

    socket.on("disconnection", () => {

    });
});

const PORT = app.get('port');

server.listen(PORT, () => {
    logger.success(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
