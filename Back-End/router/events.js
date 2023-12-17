const express = require('express');
const router = express.Router();

const eventsController = require('../controller/events');



router.get('/events',eventsController.getEvents);
router.get('/agenda/:id',eventsController.getAgenda);


module.exports = router;