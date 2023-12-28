const express = require('express');
const router = express.Router();

const eventsController = require('../controller/events');


router.get('/events/:id',eventsController.getEventsByID);
router.get('/events',eventsController.getEvents);

router.get('/agenda/:id',eventsController.getAgenda);
router.post('/add-event',eventsController.addEvent);
router.post('/add-venue-event',eventsController.addEventVenue)
router.post('/add-session',eventsController.addAgendaSession);
router.delete('/delete-session',eventsController.removeAgendaSession);
router.post('/add-expenses',eventsController.addExpenses)
router.get('/expenses/:id',eventsController.getExpensesId);
router.delete('/expense',eventsController.deleteExpeneseId);
router.delete('/event',eventsController.deleteEventId);
router.get('/organizingTeams',eventsController.getOrganizingTeam)
router.post('/add-team-event',eventsController.addEventOrganizing)
router.get('/attendees/:id',eventsController.getAttendees)
router.post('/add-attendee',eventsController.addAttendee);
router.delete('/attendee',eventsController.deleteAttendee);

// add router for add expenses and it's method is Post request

module.exports = router;