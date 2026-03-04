const express = require('express');
const router = express.Router();
const User = require("../models/users.js");
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');
const userController = require('../controllers/user');

router.get("/", userController.home);

router.get("/signup",userController.signpage);

router.post("/signup", wrapAsync(userController.signup));

router.get("/login", userController.loginpage);

router.post("/login",saveRedirectUrl,passport.authenticate("local", { failureRedirect: "/login", failureFlash: true,}) , userController.login);

router.get("/logout",userController.logout);

module.exports = router; 