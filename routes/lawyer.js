const express = require("express");
const router = express.Router();
const controllers = require("../controllers/lawyer");
const lawyerAccess = require("../middleware/lawyerAccess");
const isAuth = require("../middleware/passport");

const {
  loginRules,
  registerRules,
  validation,
} = require("../middleware/validatorLawyer");



//@method POST
//@desc POST A LAWYER
// @PATH  http://localhost:5000/lawyer/register
// @Params  Body
// register
router.post("/lawyer/register", registerRules(), validation, controllers.register);

//@method POST
//@desc POST A LAWYER
// @PATH  http://localhost:5000/lawyer/login
// @Params  Body
// register
// login
//router.post("/login", loginRules(), validation, controllers.login);

//@method GET
//@desc GET A LAWYER
// @PATH  http://localhost:5000/lawyer/current
// @Params  Body
// get current lawyer
router.get("/current",[isAuth(),lawyerAccess], controllers.current);

module.exports = router;
