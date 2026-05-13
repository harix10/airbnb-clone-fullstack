const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listing');

const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listings');
const { isLoggedIn , isOwner , validateListing } = require('../middleware.js');
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({storage});

router
    .route("/") 
    .get(wrapAsync(listingController.index)) //Index Route
    .post(isLoggedIn,validateListing,upload.single('listing[image]'),wrapAsync(listingController.create)); // Create Route

//New Route
router.get('/new',isLoggedIn,listingController.showNew);

//Show Route
router
    .route("/:id")
    .get(wrapAsync(listingController.show)) // Show Route
    .put(isLoggedIn,isOwner,validateListing,upload.single('listing[image]'),wrapAsync(listingController.update)) // Update Route
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroy)); // Delete Route

//Edit Route
router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(listingController.edit));

module.exports = router;