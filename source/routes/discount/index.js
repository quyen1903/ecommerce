
'use strict'

const express = require('express');
const { asyncHandler } = require('../../helper/asyncHandler');
const { authenticationV2 } = require('../../auth/authUtils');
const discountController = require('../../controllers/discount.controller');
const router = express.Router();

//get amount a  discount 
router.post('/amount', asyncHandler(discountController.getDiscountAmount));
router.get('/list_product_code', asyncHandler(discountController.getAllDiscountCodesWithProducts));


/* Authentication*/
router.use(authenticationV2)

router.post('',discountController.createDiscountCode);
router.get('',discountController.getAllDiscountCodes);

module.exports = router