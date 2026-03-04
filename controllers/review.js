const Listing = require('../models/listings');
const Review = require('../models/reviews');


module.exports.post = async (req,res)=>{
  let {id} = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success","New Review Added!");
  res.redirect(`/listing/${id}`);
};

module.exports.destroy = async(req,res) => {
  let { id,reviewId } = req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review Deleted!");
  res.redirect(`/listing/${id}`);
};


