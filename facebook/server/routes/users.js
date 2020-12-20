const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const passport = require("passport");
const tokenMiddleware = require("../middlewares/token");

const userController = require("../controllers/user");

/* GET all users */
router.get("/users", userController.get_users);

router.get("/users/:user_id", userController.get_user);

/** Photos pictures */
/** Update profile pic */
router.put("/:user_id/profile_photo", userController.update_profile_photo);

/** Update Cover pic */
router.put("/:user_id/cover_photo", userController.update_cover_photo);



module.exports = router;
