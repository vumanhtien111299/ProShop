import path from 'path'
import express from 'express'
import multer from 'multer'
import * as uploadAws from '../controllers/upload/upload.handle.js'
import * as authentication from '../controllers/authentication/authentication.handle.js'

const router = express.Router()

export default (prefix) => {
    // Prefix path
    prefix.use('/uploads', router)

    function checkFileType(file, cb) {
        const filetypes = /jpg|jpeg|png/
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = filetypes.test(file.mimetype)

        if (extname && mimetype) {
            return cb(null, true)
        } else {
            cb('Images only!')
        }
    }

    router.post('/:Id', authentication.verifyToken, multer({}).single('image'), uploadAws.uploadImage)
}
