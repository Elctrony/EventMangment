const express = require('express');
const dashboardController = require("../controller/dashboard");
const router = express.Router();

router.post('/add-organizer',dashboardController.addOrganizingTeam);
router.post('/add-venue',dashboardController.addVenue);
router.post('/add-speaker',dashboardController.addSpeaker);
router.post('/add-sponsor',dashboardController.addSponsor);
router.delete('/delete-venue',dashboardController.deleteVenue);
router.delete('/delete-organizer',dashboardController.deleteOrganizingTeamMember);
router.get('/speakers',dashboardController.getSpeakers);
router.delete('/delete-speaker',dashboardController.deleteSpeaker);
router.get('/sponsors',dashboardController.getSponsors);
router.delete('/delete-sponsor',dashboardController.deleteSponsor);

router.get('/statistics',dashboardController.getStatistics);
router.get('/events-table',dashboardController.getEventTable);
router.get('/organizer-table',dashboardController.getOrganizerTable)
module.exports = router;