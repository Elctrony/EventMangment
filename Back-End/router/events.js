const express = require('express');
const router = express.Router();

const eventsController = require('../controller/events');



router.get('/events',eventsController.getEvents);
router.get('/agenda/:id',eventsController.getAgenda);
router.post('/add-event',eventsController.addEvent);
router.post('/add-event-manger',eventsController.addEventManger);

module.exports = router;