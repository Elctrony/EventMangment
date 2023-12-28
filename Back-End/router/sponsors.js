const express = require('express');
const router = express.Router();

const sponsorController= require('../controller/sponsors')

router.get('/sponsors',sponsorController.getAllSponsors);
router.post('/sponsors/add-offer',sponsorController.addSponsorOffer);
router.get('/sponsor-offers/:id',sponsorController.getSponsorOffers);

module.exports = router;