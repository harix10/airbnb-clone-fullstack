const Listing = require('../models/listings');


module.exports.index = async (req,res)=>{
  let listing = await Listing.find();
  res.render('listings/index.ejs',{listing});
};

module.exports.showNew =  (req,res)=>{
  res.render('listings/new.ejs');
};

module.exports.show = async(req,res)=>{
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

};

module.exports.create = async (req,res,next)=>{
  if(!req.body.listing.image){
    req.body.listing.image = undefined;
  }
  let newElm = new Listing(req.body.listing);
  newElm.owner = req.user._id;
  await newElm.save();
  req.flash("success","New Listing Created!");
  res.redirect('/listing');
  };

  module.exports.edit = async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    if (!list){
     req.flash("error","Listing you requested is not available!");
     return res.redirect("/listing");
    }
    res.render('listings/edit.ejs',{list});
  };

  module.exports.update = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Listing Updated!");
    res.redirect(`/listing/${id}`);
  };
  
  module.exports.destroy = async(req,res)=>{
   let {id} = req.params;
   await Listing.findByIdAndDelete(id);
   req.flash("success","Listing Deleted!");
   res.redirect('/listing');
};
