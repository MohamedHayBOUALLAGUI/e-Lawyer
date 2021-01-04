const User = require("../models/User");

const userAccess = async (req, res, next) => {
  console.log(req)
  try {
    const user = await User.findOne({ isClient: req.user.isClient });
    console.log(user);
    if (user.isClient===false){
      return res.status(400).json({ msg: "User ressources acces denied" })} else   
      {next()}
  } catch (err) {
    return res.status(500).json({ msg: err.message });
    
  }
};

module.exports = userAccess;