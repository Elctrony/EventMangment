const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');


router.post('/add-event-manager',authController.addEventManager);
router.post('/login-event-manager',authController.getEventManager);
router.post('/login-organizing',authController.getOrganizing);

module.exports = router;