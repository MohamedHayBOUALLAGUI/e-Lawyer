const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user");
const isAuth = require("../middleware/passport");
const adminAccess = require("../middleware/adminAccess");
const userCtrl = require("../controllers/admin");

const {
  loginRules,
  registerRules,
  validation,
} = require("../middleware/validator");

//@method POST
//@desc POST A USER
// @PATH  http://localhost:5000/user/register
// @Params  Body
// register
router.post(
  "/user/register",
  registerRules(),
  validation,
  controllers.register
);

//@method POST
//@desc POST A USER
// @PATH  http://localhost:5000/user/login
// @Params  Body
// register
// login
router.post("/login", loginRules(), validation, controllers.login);

//@method GET
//@desc GET A USER
// @PATH  http://localhost:5000/user/current
// get current user
router.get("/current", isAuth(), controllers.current);

//@method PATCH
//@desc ADD an admin
// @PATH  http://localhost:5000/admin/add_admin/:id
// params:id
router.patch("/admin/add_admin/:id", [isAuth()], userCtrl.addAdmin);

//@method PATCH
//@desc ban a user
// @PATH  http://localhost:5000/admin/ban/:id
// params:id

router.patch("/admin/ban/:id", [isAuth(), adminAccess], userCtrl.banUser);
//@method PATCH
//@desc unban a user/lawyer
// @PATH  http://localhost:5000/admin/ban/:id
// params:id

//@method PATCH
//@desc delete a user
// @PATH  http://localhost:5000/admin/delete/:id
// params:id

router.delete(
  "/admin/delete/:id",
  [isAuth(), adminAccess],
  userCtrl.deleteUser
);

//@method GET
//@desc get all users
// @PATH  http://localhost:5000/admin/all_info"

router.get("/admin/all_info", isAuth(), userCtrl.getAllUsersInfos);

module.exports = router;
