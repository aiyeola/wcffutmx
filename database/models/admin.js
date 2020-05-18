const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    password: {
      type: String,
      required: true
    },
    userRole: {
      type: String,
      default: 'Administrator'
    }
  },
  {
    timestamps: true
  }
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
