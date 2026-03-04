const express = require('express');
const router = express.Router({mergeParams:true});
const reviewController = require('../controllers/review');

const Review = require('../models/reviews');
const Listing = require('../models/listings');
const wrapAsync = require('../utils/wrapAsync');
const { validateReview ,  isLoggedIn , isReviewAuthor } = require('../middleware');


//Post Route
router.post('/',isLoggedIn,validateReview,wrapAsync(reviewController.post));

//Delete Route
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroy));

module.exports = router;