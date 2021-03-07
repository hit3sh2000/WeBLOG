const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  uname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contactno: {
    type: Number
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

module.exports = mongoose.model('User', userSchema);
