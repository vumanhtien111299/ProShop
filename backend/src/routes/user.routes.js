import express from 'express'
import multer from 'multer'
import *  as User from '../controllers/user/user.handle.js'
import * as authentication from '../controllers/authentication/authentication.handle.js'

const router = express.Router()

export default (prefix) => {
    // Prefix path
    prefix.use('/users', authentication.verifyToken, router);

    // @desc Get profile user
    // @route Get /users/profile
    // @access Bearer Authentication
    router.get('/profile', User.getProfileUser)

    // @desc Update profile user
    // @route PUT /users/profile/:id
    // @access Bearer Authentication
    router.put('/profile/:id', User.updateUserProfile)

    // @desc Get all users
    // @route GET /users
    // @access Bearer Authentication
    router.get('/', authentication.verifyToken, User.getAllUsers)

    // @desc Delete users
    // @route Delete /users/:id
    // @access Private/Admin
    router.delete('/:id', authentication.admin, User.deleteUser)

    // @desc Get users
    // @route Get /users/:id
    // @access Private/Admin
    router.get('/:id', authentication.admin, User.getUserById)

    // @desc Update user
    // @route PUT /users/:id
    // @access Private/Admin
    router.put('/:id', authentication.admin, User.updateUser)

    // @desc Upload user avatar
    // @route POST /:id/avatar
    // @access Bearer Authentication
    router.post('/:id/avatar', authentication.verifyToken, multer({}).single('avatar'), User.uploadAvatar);

}
