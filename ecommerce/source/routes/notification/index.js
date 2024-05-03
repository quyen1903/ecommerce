'use strict'

'use strict'

const express = require('express');
const NotificationController = require('../../controllers/notification.controller');
const { asyncHandler } = require('../../helper/asyncHandler');
const { authenticationV2 } = require('../../auth/authUtils');
const router = express.Router();

//not login yet

/* Authentication*/
router.use(authenticationV2)

//already login
router.get('',asyncHandler(NotificationController.listNotiByUser));

module.exports = router