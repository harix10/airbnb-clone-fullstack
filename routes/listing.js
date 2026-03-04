const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listing');

const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listings');
const { isLoggedIn , isOwner , validateListing } = require('../middleware.js');

//Index Route
router.get('/',wrapAsync(listingController.index));

//New Route
router.get('/new',isLoggedIn,listingController.showNew);

//Show Route
router.get('/:id',wrapAsync(listingController.show));

//Create Route
router.post('/',isLoggedIn,validateListing,wrapAsync(listingController.create));

//Edit Route
router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(listingController.edit));

//Update Route
router.put('/:id',isLoggedIn,isOwner,validateListing,wrapAsync(listingController.update));

//Delete Route
router.delete('/:id',isLoggedIn,isOwner,wrapAsync(listingController.destroy));

module.exports = router;