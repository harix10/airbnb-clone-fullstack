const express = require('express');
const router = express.Router();
const User = require("../models/users.js");
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');
const userController = require('../controllers/user');

router.get("/", userController.home);

router
    .route("/signup")
    .get(userController.signpage)
    .post( wrapAsync(userController.signup));

router
    .route("/login")
    .get(userController.loginpage)
    .post(saveRedirectUrl,passport.authenticate("local", { failureRedirect: "/login", failureFlash: true,}) , userController.login);

router.get("/logout",userController.logout);

module.exports = router; 

// MVC framework