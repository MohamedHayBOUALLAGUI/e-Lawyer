const authttuser = async (req, res, next) => {
    try {
      const user = await User.findOne({ isUser: req.user.isUser });
      if (!user){
        return res.status(400).json({ msg: "User ressources acces denied" })} else   
        {next()}
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };
  
  module.exports = authttuser;