const express = require('express');
const router = express.Router();

const sponsorController= require('../controller/sponsors')

router.get('/sponsors',sponsorController.getAllSponsors);
router.post('/sponsors/add-offer',sponsorController.addSponsorOffer);
router.get('/event-sponsor-offers/:id',sponsorController.getSponsorOffers);



// Middleware to get sponsor offers
router.get('/sponsor-offers/:id', sponsorController.getAllSponsorsOffer);

// Middleware to handle offer acceptance
router.post('/sponsor-offers/accept', sponsorController.acceptOffer);

// Middleware to handle offer rejection
router.post('/sponsor-offers/reject', sponsorController.rejectOffer);

module.exports = router;