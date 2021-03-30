import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

export default (prefix) => {
    const __dirname = path.resolve()
    // Prefix path
    prefix.use('/uploads', express.static(path.join(__dirname, '/uploads')), router)

    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/')
        },
        filename(req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
        }
    })

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
    const upload = multer({
        storage,
        fileFilter: function (req, file, cb) {
            checkFileType(file, cb)
        }
    })

    router.post('/', upload.single('image'), (req, res) => {
        res.send(`/${req.file.path}`)
    })
}
