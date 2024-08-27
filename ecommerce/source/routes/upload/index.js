'use strict'

const express = require('express');
const uploadController = require('../../controllers/upload.controller');
const { asyncHandler } = require('../../helper/asyncHandler');
const router = express.Router();

router.post('/product/upload',asyncHandler(uploadController.uploadFile))


module.exports = router