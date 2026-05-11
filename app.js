if (process.env.NODE_ENV != "production"){
require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose  = require('mongoose');
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/users');

mongoose.connect('mongodb://127.0.0.1:27017/WanderLust')
  .then(() => console.log('Connected!'));  

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions = {
  secret:"supersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() + 1000*60*60*24*3,
    maxAge: 1000*60*60*24*3,
    httpOnly: true
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

const listingRouter = require('./routes/listing');
const reviewRouter = require('./routes/review');
const userRouter = require('./routes/user');



app.listen(3030,()=> {
    console.log('server is running..');
});

//Routes
app.use('/listing',listingRouter);
app.use('/listing/:id/reviews',reviewRouter);
app.use('/',userRouter);


app.all(/(.*)/,(req,res,next) =>{
  next(new ExpressError(404,"Page Not Found"));
});

app.use((err,req,res,next) => {
  let {status=400,message="Some error Occured"} = err;
  res.status(status);
  res.render('error.ejs',{message});
});
