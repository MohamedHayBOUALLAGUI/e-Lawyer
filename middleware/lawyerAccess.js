const User = require("../models/User");

const lawyerAccess = async (req, res, next) => {
  try {
    const lawyer = await User.findOne({ isLawyer: req.user.isLawyer });
    if (lawyer.isLawyer===false){
      return res.status(400).json({ msg: "Lawyer ressources acces denied" })} else   
      {next()}
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = lawyerAccess;