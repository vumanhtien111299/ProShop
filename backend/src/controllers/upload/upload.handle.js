import * as upload from './upload.process.js'

export const uploadImage = async (req, res) => {
    const { status, message, data } = await upload.uploadService({ Id: req.params.Id, file: req.file })

    return res.status(status).send(data)
}
