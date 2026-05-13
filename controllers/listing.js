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
  let url = req.file.path;
  let filename = req.file.filename;
  req.body.listing.image = {url,filename};

  // Geocode location using OpenStreetMap
  let response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(req.body.listing.location + ', ' + req.body.listing.country)}`, {
      headers: { 'User-Agent': 'AirbnbApp/1.0' }
  });
  let geoData = await response.json();

  let newElm = new Listing(req.body.listing);
  newElm.owner = req.user._id;
  if (geoData && geoData.length > 0) {
      newElm.geometry = { type: 'Point', coordinates: [parseFloat(geoData[0].lon), parseFloat(geoData[0].lat)] };
  } else {
      newElm.geometry = { type: 'Point', coordinates: [0, 0] }; // Default fallback
  }
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
    
    let imageUrl = list.image.url;
    imageUrl = imageUrl.replace("/upload","/upload/w_250");
    res.render('listings/edit.ejs',{list , imageUrl});
  };

  module.exports.update = async (req,res)=>{
    let {id} = req.params;

    // Geocode updated location
    let response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(req.body.listing.location + ', ' + req.body.listing.country)}`, {
        headers: { 'User-Agent': 'AirbnbApp/1.0' }
    });
    let geoData = await response.json();
    let geometry = (geoData && geoData.length > 0) 
        ? { type: 'Point', coordinates: [parseFloat(geoData[0].lon), parseFloat(geoData[0].lat)] }
        : { type: 'Point', coordinates: [0, 0] };
    
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing, geometry });
    
   if ( typeof (req.file) !== "undefined"){ 
   let url = req.file.path;
   let filename = req.file.filename;
   listing.image = {url , filename};
   await listing.save();
   }

    req.flash("success","Listing Updated!");
    res.redirect(`/listing/${id}`);
  };
  
  module.exports.destroy = async(req,res)=>{
   let {id} = req.params;
   await Listing.findByIdAndDelete(id);
   req.flash("success","Listing Deleted!");
   res.redirect('/listing');
};
