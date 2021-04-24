import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { afterSendMessage, getMessage } from '../actions/chat.actions.js'
import { listUsers } from '../actions/user.actions.js'
import { Button, Image, Figure } from 'react-bootstrap'
import { generatePicture } from '../urlConfig.js'
import { AWS_FOLDER } from '../config.js'

import moment from 'moment'



import '../index.css'
import { Discovery } from 'aws-sdk'
import { GET_MESSAGES_FAIL } from '../constants/chat.constants.js'

let socket
let messagesEnd

const Chat = () => {
    const { userInfo } = useSelector(({ userLogin }) => userLogin)
    const { messages } = useSelector(({ chat }) => chat)
    const { users } = useSelector(({ userList }) => userList)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [usersChat, setUsersChat] = useState(users)
    const [receiverName, setReceiverName] = useState('')
    const [receiverId, setReceiverId] = useState('')
    const [receiverAvatar, setReceiverAvatar] = useState('')

    const endpoint = 'http://localhost:5000'

    const handleSetReceiver = (id) => {
        setReceiverId(id)
        // find user based on id
        const user = users?.data && users.data.find(user => user._id === id)
        setReceiverName(user.name)
        setReceiverAvatar(user.avatar)
        console.log(user)
    }

    useEffect(() => {
        socket = io(endpoint)
        const room = 'ProShop-VMT'

        socket.emit('room', room);

        socket.on('Output chat message', (msg) => {
            dispatch(afterSendMessage(msg))
            console.log(msg)
        })

        return () => {
            socket.emit("disconnection");
            socket.off();
        };
    }, [])

    useEffect(() => {
        dispatch(getMessage())
    }, [])

    //function for sending message
    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {

            socket.emit(
                'sendMessage', {
                message,
                sender: userInfo?._id,
                receiver: !receiverId ? users?.data[0]?._id : receiverId,
            })
            setMessage('')
            console.log(message)
        }
    }


    useEffect(() => {
        dispatch(listUsers({
            isAdmin: !userInfo?.isAdmin
        }))
    }, [])



    return (
        <div className="content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card">
                            <div className="card-header text-uppercase" style={{ margin: '7px' }}>Friends</div>
                            <div className="card-body outer-message" style={{ padding: '0' }}>
                                {
                                    users?.data && users.data.map((user) => (
                                        <ul className="list-group">
                                            <li className='d-flex justify-content-between align-items-center list-friend-css'
                                                onClick={() => handleSetReceiver(user._id)}>
                                                <div class="user-profile" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Figure.Image width={70} height={70} rounded className="img-circle" alt="171x180" src={`${AWS_FOLDER.IMAGE}${user.avatar}`} roundedCircle fluid />
                                                    <div style={{ paddingLeft: '10px' }} className="mt-0 mb-1 ml-1">{user.name}</div>
                                                </div>
                                            </li>
                                        </ul>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="card">
                            <div className="card-header text-uppercase">
                                <div className="user-profile" style={{ display: 'flex', alignItems: 'center' }}>
                                    {
                                        userInfo?.isAdmin && (
                                            <div className="user-profile" style={{ display: 'flex', alignItems: 'center' }}>
                                                {/* <img src={receiverAvatar ? generatePicture(receiverAvatar) : "https://via.placeholder.com/110x110"} className="img-circle user-profile" alt="user avatar" /> */}
                                                <span><div className="mt-0 mb-1 ml-1">{receiverName}</div></span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            <div class="card-body outer-message" >
                                {
                                    Array.isArray(users?.data) && messages.filter(msg => (msg?.sender?._id === userInfo?._id && msg?.receiver?._id === receiverId) || (msg?.sender?._id === receiverId && msg?.receiver?._id === userInfo?._id) || (msg?.sender?._id === userInfo._id && msg?.receiver?._id === users?.data[0]?._id) || (msg?.sender?._id === users?.data[0]?._id && msg?.receiver?._id === userInfo?._id)).map((msg, index) => (
                                        <div>
                                            {
                                                msg?.sender?._id !== userInfo?._id ? (
                                                    <>
                                                        <div className="user-profile" style={{ display: 'flex', marginTop: '10px' }}>
                                                            <Figure.Image width={70} height={100} src={`${AWS_FOLDER.IMAGE}${msg.sender?.avatar}`} roundedCircle fluid />
                                                            <div className="card ml-1" style={{ borderRadius: '15px', marginBottom: '0' }}>
                                                                <div className="card-body" style={{ padding: '5px 20px' }}>
                                                                    <div className="list-unstyled">
                                                                        <div className="media">
                                                                            <div className="media-body" style={{ wordBreak: 'break-all', color: 'red' }}>
                                                                                {msg.message}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ wordBreak: 'break-all' }}><small style={{ marginLeft: '60px', color: 'rgb(172 170 170)' }}>{moment(msg.createdAt).fromNow()}</small></div>
                                                        {/* <div style={{ color: 'red' }}>
                                                {msg.message}
                                            </div> */}
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="user-profile" style={{ display: 'flex', marginTop: '10px', justifyContent: 'flex-end' }}>
                                                            <div className="card ml-1" style={{ borderRadius: '15px', backgroundColor: 'rgb(0, 132, 255)', marginBottom: '0', marginRight: '5px' }}>
                                                                <div className="card-body" style={{ padding: '5px 20px' }}>
                                                                    <div className="list-unstyled">
                                                                        <div className="media">
                                                                            <div className="media-body" style={{ wordBreak: 'break-all' }}>
                                                                                {msg.message}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Figure.Image width={70} height={100} src={`${AWS_FOLDER.IMAGE}${msg.sender?.avatar}`} roundedCircle fluid />
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}><small style={{ marginRight: '40px', color: 'rgb(172 170 170)' }}>{moment(msg.createdAt).fromNow()}</small></div>
                                                    </>

                                                )
                                            }
                                        </div>
                                    ))
                                }

                            </div>
                            <input
                                className='input'
                                type='text'
                                placeholder='Type a message...'
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                            />
                            <Button className='sendButton' onClick={(event) => sendMessage(event)}>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
