const express = require("express");
const router = express.Router();
const passport = require("passport");
const tokenMiddleware = require("../middlewares/token");

const authController = require('../controllers/auth');

/* Login */
router.post("/login", authController.login, tokenMiddleware);

/* Register */
router.post("/register", authController.register, tokenMiddleware);

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

module.exports = router;