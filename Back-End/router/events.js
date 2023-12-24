const express = require('express');
const router = express.Router();

const eventsController = require('../controller/events');


router.get('/events/:id',eventsController.getEventsByID);
router.get('/events',eventsController.getEvents);
router.get('/agenda/:id',eventsController.getAgenda);
router.post('/add-event',eventsController.addEvent);
router.post('/add-venue-event',eventsController.addEventVenue)

module.exports = router;