const mongoose  = require('mongoose');
const Listing = require('../models/listings');
const initData = require('./data.js');

mongoose.connect('mongodb://127.0.0.1:27017/WanderLust')
  .then(() => console.log('Connected!'));  


const initDB = async ()=>{
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj) => ({...obj, owner:"69836f39ba072e927b1da0f5"}));
   await Listing.insertMany(initData.data);
   console.log('data was initialized..');
};

initDB();
