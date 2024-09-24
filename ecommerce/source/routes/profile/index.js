const express = require ('express');
const {asyncHandler} = require('../../helper/asyncHandler');
const profileController = require('../../controllers/profile.controller');
const {grantAccess} = require('../../middlewares/rbac')
const router = express.Router();

console.log('touch here')
router.get('/viewAny', grantAccess('readAny', 'profile'),asyncHandler(profileController.profiles))
router.get('viewOwn',grantAccess('readOwn', 'profile'),asyncHandler(profileController.profile))

module.exports = router