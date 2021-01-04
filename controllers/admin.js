const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");



exports.getAllUsersInfos= async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };
  exports.addAdmin= async (req, res) => {
    try {
        const userA=await User.findOne({ _id: req.params.id });
      const user=await User.findOneAndUpdate({ _id: req.params.id }, { isAdmin:!userA.isAdmin });
      res.json({ admin:user,msg: "new admin added successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  exports.deleteUser= async (req, res) => {
    try {
      await User.findOneAndDelete({ _id: req.params.id });
        // Remove user posts
    await Post.deleteMany({ user: req.params.id });
    /*const comment = post.comments.find(
        comment => comment.id === req.params.comment_id
      );*/
    // Remove profile
    await Profile.findOneAndRemove({ user:  req.params.id});
      return res.json({ msg: "User deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  exports.banUser= async (req, res) => {
    try {
        const userA=await User.findOne({ _id: req.params.id });
        const user=await User.findOneAndUpdate({ _id: req.params.id }, { isBan:!userA.isBan });
      res.json({ user,msg: "user get banned !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
 
  