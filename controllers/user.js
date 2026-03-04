const User = require("../models/users.js");

module.exports.home = (req,res) => {
  res.render("home.ejs");
};

module.exports.signpage =  (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res,next) => {
  try{
    let { username , email , password } = req.body;
    const newUser = new User({ email,username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser , (err) => {
      if (err) {
         return next(err);
      }else{
        req.flash("success","Welcome to WanderLust!");
        res.redirect("/listing");
      }
    });
  }
  catch(e) {
    req.flash("error",e.message);
    res.redirect("/signup");
  }
};

module.exports.loginpage = (req,res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req,res) => {
  req.flash("success","Welcome Back!");
  let redirectUrl = res.locals.redirectUrl || "/listing";
  if(redirectUrl.includes("/reviews")){
    redirectUrl = redirectUrl.split("/reviews")[0];
  }
  res.redirect(redirectUrl);
};

module.exports.logout =  (req,res,next) => {
  req.logout((err) => {
    if(err){
      return next(err);
    }else{
      req.flash("success","Logged you out!");
      res.redirect("/listing");
    }
  });
};
