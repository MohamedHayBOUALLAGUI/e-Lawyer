const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar=require("gravatar");
const normalize = require('normalize-url');

exports.register = async (req, res) => {
  const { name, lastName, email, password,lawyerSpecialty } = req.body;
  //add img user
  const img = normalize(
    gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    }),
    { forceHttps: true }
  );
  try {
  
    const newUser = new User({ name, lastName, email, password,img,isClient:false,isLawyer:true,lawyerSpecialty });

    //   check if the email exist
    const searchedUser = await User.findOne({ email });
    if (searchedUser) {
      return res.status(400).send({ msg: "email already exist" });
    }
    
    // hash password
    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    newUser.password = hashedPassword;

    // save the user
    const newUserToken = await newUser.save();
    // generate a token
    const payload = {
      _id: newUserToken._id,
      name: newUserToken.name,
    };
    const token = await jwt.sign(payload, process.env.secretOrKey, {
      expiresIn: '7d' ,
    });
    res.status(200).send({
      user: newUserToken,
      msg: "user is saved",
      token: ` Bearer ${token}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "can not save the user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //   find if the user exist
    const searchedUser = await User.findOne({ email });
    // if the email not exist
    if (!searchedUser) {
      return res.status(400).send({ msg: "bad Credential" });
    }
    // password are equals
    const match = await bcrypt.compare(password, searchedUser.password);

    if (!match) {
      return res.status(400).send({ msg: "bad Credential" });
    }
    // generate a token
    const payload = {
      _id: searchedUser._id,
      name: searchedUser.name,
    };
    const token = await jwt.sign(payload, process.env.secretOrKey, {
      expiresIn: '7d' ,
    });
    // send the user
    res
      .status(200)
      .send({ user: searchedUser, msg: "success", token: ` Bearer ${token}` });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "can not get the user" });
  }
};

exports.current = (req, res) => {
  res.status(200).send({ user: req.user });
  console.log(req)
};
