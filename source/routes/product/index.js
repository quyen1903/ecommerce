'use strict'

const express = require('express');
const productController = require('../../controllers/product.controller');
const { asyncHandler } = require('../../helper/asyncHandler');
const { authenticationV2 } = require('../../auth/authUtils');
const router = express.Router();

router.get('/search/:keySearch',asyncHandler(productController.getListSearchProduct))
/* Authentication*/
router.use(authenticationV2)

///////
router.post('',asyncHandler(productController.createProduct))
router.post('/pubish/:id',asyncHandler(productController.pubishProductByShop));
router.post('/unpubish/:id',asyncHandler(productController.unPubishProductByShop))


//query
router.get('/drafts/all',asyncHandler(productController.getAllDraftForShop))
router.get('/pubished/all',asyncHandler(productController.getAllPublishForShop))

module.exports = router