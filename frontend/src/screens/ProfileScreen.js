import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { getUserDetails, updateUserProfile, uploadUserAvatarAction } from '../actions/user.actions.js'
import { listMyOrders } from '../actions/order.actions.js'
import { formatTimeZone } from '../utils/index.js'
import { USER_UPDATE_PROFILE_RESET } from '../constants/user.constants.js'
import { AWS_FOLDER } from '../config.js';


const ProfileScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [avatar, setAvatar] = useState('')
    const [avatarSrc, setAvatarSrc] = useState('')

    const dispatch = useDispatch()
    const { loading, error, user } = useSelector(({ userDetails }) => userDetails)
    const { userInfo } = useSelector(({ userLogin }) => userLogin)
    const { success } = useSelector(({ userUpdateProfile }) => userUpdateProfile)
    const { loading: loadingOrders, error: errorOrders, orders } = useSelector(({ orderMyList }) => orderMyList)

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            // First it will check if the user profile is exist
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                // If not, call the getUserDetail action to get the user Detail
                // and set it as user in storage
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
            } else {
                // If the user profile is existed, fill it in
                setName(user.name);
                setEmail(user.email);
                setAvatarSrc(`${AWS_FOLDER.IMAGE}${user?.avatar}`);
            }
        }
    }, [dispatch, history, userInfo, user, success]);

    const handleChangeAvatar = (e) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) => {
            setAvatarSrc(e.target.result)
        }

        setAvatar(e.target.files[0])
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (avatar) {
            dispatch(uploadUserAvatarAction({
                id: user._id,
                file: avatar,
            }));
        }
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ _id: user._id, name, email, password }))
        }
    }

    return <Row>
        <Col md={3}>
            <h1>User Profile</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <div className="d-flex align-items-center flex-column">
                        <Image src={avatarSrc ? avatarSrc : `${AWS_FOLDER.IMAGE}${user?.avatar}`} roundedCircle fluid alt={user?._id} style={{ width: '205px', height: '205px', objectFit: 'cover' }} />
                        <div style={{ paddingTop: '10px' }}>
                            <Form.File
                                onChange={handleChangeAvatar}
                                id="custom-file-translate-scss"
                                label="Select avatar"
                                accept='image/*'
                                lang="en"
                                custom
                            />
                        </div>
                    </div>
                </Form.Group>


                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={true}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    // required={true}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    // required={true}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
            </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : userInfo && userInfo.isAdmin === false && (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{formatTimeZone(order.createdAt)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? formatTimeZone(order.paidAt) : (
                                    <i className="fas fa-times" style={{ color: "red" }}></i>
                                )}</td>
                                <td>{order.isDelivered ? formatTimeZone(order.deliveredAt) : (
                                    <i className="fas fa-times" style={{ color: "red" }}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/orders/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
}

export default ProfileScreen

