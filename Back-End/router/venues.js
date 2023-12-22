const express = require('express');
const router = express.Router();

const venueController = require('../controller/venue');



router.get('/venues',venueController.getVenues);
router.get('/venues-location',venueController.getVenuesLocation);



module.exports = router;