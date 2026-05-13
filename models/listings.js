const mongoose  = require('mongoose');
const url = "https://plus.unsplash.com/premium_photo-1664302360941-bb602bd53273?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const Review = require('./reviews');

const listingSchema = new mongoose.Schema({
 title: {
    type:String,
    required:true,
 },
 description: {
 type:String,
 },
 image: {
    url: String,
    filename: String,
 },
 price:{
   type:Number,
   required:true,
 },
 location:{
    type:String,
    required:true,
 },
 country:{
    type:String,
    required:true,
 },
 geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
 },
 reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Review'
 }],
 owner: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
 },
});  

listingSchema.post('findOneAndDelete',async (listing) => {
   if (listing){
      await Review.deleteMany({_id: { $in: listing.reviews }});
   }
});

module.exports = mongoose.model('Listing',listingSchema);
