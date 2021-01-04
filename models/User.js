const mongoose = require("mongoose");
const schema = mongoose.Schema;
const UserSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  isAdmin:{
    type:Boolean,
    default:false,
    },
    isClient:{
      type:Boolean,
    default:true,
    },
    isLawyer:{
      type:Boolean,
    default:false,
    },
    lawyerSpecialty:{
      type:String,

    },
    isBan:{
      type:Boolean,
    default:false,
    },
    address: {
      addr1: String,
      addr2: String,
      city: String,
      state: String,
      country: String,
      postalCode: String
    },
    age:Number,
    lawyerRating:{
      type:String,

    },

});

module.exports = mongoose.model("user", UserSchema);
