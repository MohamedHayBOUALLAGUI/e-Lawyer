const User = require("../models/User");

const adminAccess = async (req, res, next) => {
  try {
    const admin = await User.findOne({ isAdmin: req.user.isAdmin });
    if (admin.isAdmin===false){
      return res.status(400).json({ msg: "Access denied" })} else   
      {next()}
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = adminAccess;