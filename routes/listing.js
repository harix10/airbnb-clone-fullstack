const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listings');
const { isLoggedIn , isOwner , validateListing } = require('../middleware.js');

//Index Route
router.get('/',wrapAsync(async (req,res)=>{
  let listing = await Listing.find();
  res.render('listings/index.ejs',{listing});
}));

//New Route
router.get('/new',isLoggedIn, (req,res)=>{
  res.render('listings/new.ejs');
});

//Show Route
router.get('/:id',wrapAsync(async(req,res)=>{
  let {id} = req.params;
  let list = await Listing.findById(id).populate({
    path:'reviews',
    populate:{
      path:'author',
    },
  }).populate("owner");
  if (!list){
   req.flash("error","Listing you requested is not available!");
   return res.redirect("/listing");
  }
  res.render('listings/show.ejs',{list});

}));

//Create Route
router.post('/',isLoggedIn,validateListing,wrapAsync(async (req,res,next)=>{
  if(!req.body.listing.image){
    req.body.listing.image = undefined;
  }
  let newElm = new Listing(req.body.listing);
  newElm.owner = req.user._id;
  await newElm.save();
  req.flash("success","New Listing Created!");
  res.redirect('/listing');
  }
  )
);

//Edit Route
router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
  let {id} = req.params;
  let list = await Listing.findById(id);
  if (!list){
   req.flash("error","Listing you requested is not available!");
   return res.redirect("/listing");
  }
  res.render('listings/edit.ejs',{list});

}));

//Update Route
router.put('/:id',isLoggedIn,isOwner,validateListing,wrapAsync(async (req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success","Listing Updated!");
  res.redirect(`/listing/${id}`);
}));

//Delete Route
router.delete('/:id',isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
   let {id} = req.params;
   await Listing.findByIdAndDelete(id);
   req.flash("success","Listing Deleted!");
   res.redirect('/listing');
}));

module.exports = router;