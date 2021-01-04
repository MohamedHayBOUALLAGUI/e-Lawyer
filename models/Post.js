const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  lastName: {
    type: String
  },
  img: {
    type: String
  },
  lawyerSpecialty:{
    type:String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  dislikes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      lastName: {
        type: String
      },
      lawyerSpecialty:{
        type:String,
  
      },
      img: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('post', PostSchema);