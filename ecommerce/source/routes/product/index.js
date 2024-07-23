'use strict'

const express = require('express');
const productController = require('../../controllers/product.controller');
const { asyncHandler } = require('../../helper/asyncHandler');
const { authenticationV2 } = require('../../auth/authUtils');
const router = express.Router();

router.get('/search/:keySearch',asyncHandler(productController.getListSearchProduct))
router.get('',asyncHandler(productController.findAllProducts))
router.get('/:product_id',asyncHandler(productController.findProduct))


/* Authentication*/
router.use(authenticationV2)

///////

router.patch('/:productId',asyncHandler(productController.updateProduct));
router.post('',asyncHandler(productController.createProduct));
router.post('/publish/:id',asyncHandler(productController.pubishProductByShop));
router.post('/unpublish/:id',asyncHandler(productController.unPubishProductByShop));


//query
router.get('/drafts/all',asyncHandler(productController.getAllDraftForShop));
router.get('/published/all',asyncHandler(productController.getAllPublishForShop));

module.exports = router