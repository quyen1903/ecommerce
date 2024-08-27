'use strict'
const cloudinary = require("../configs/config.cloudinary")

const uploadImageFromURL = async ()=>{
    try {
        const urlImage = 'https://down-vn.img.susercontent.com/file/c806032735234f850eff528f7a674327',
        folderName = 'product/shopId',newFileName = 'testdemo'

        const result = await cloudinary.uploader.upload(urlImage, {
            public_id: newFileName,
            folder: folderName
        })
        console.log(result)
    } catch (error) {
        console.error('upload image error ', error)
    }
}

uploadImageFromURL().catch()
module.exports = {
    uploadImageFromURL
}