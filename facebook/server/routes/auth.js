const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require('../controllers/auth');

/* Login */
router.post("/login", authController.login);

/* Register */
router.post("/register", authController.register);

/* Facebook auth */
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    session: false,
  })
);

router.get(
  "/auth/facebook/callback",
  authController.facebook_callback
 );

 /* Logout */
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect(process.env.FRONTEND_URL);
});

/* check if user is logged in */

router.get('/checkAuth', authController.checkAuth);

module.exports = router;