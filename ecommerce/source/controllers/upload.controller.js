'use strict'

const { SuccessResponse } = require("../core/success.response")
const { uploadImageFromURL } = require("../services/upload.service")

class UploadController{
    uploadFile = async (req,res,next)=>{
        new SuccessResponse({
            message: 'upload successfully ',
            metadata: await uploadImageFromURL()
        }).send(res);
    }
}

module.exports = new UploadController()