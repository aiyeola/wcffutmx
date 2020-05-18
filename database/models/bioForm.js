const mongoose = require('mongoose');

const bioSchema = new mongoose.Schema(
  {
    surname: {
      type: String,
      required: true,
      trim: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    department: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    schoolAddress: {
      type: String,
      required: true
    },
    homeAddress: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    contactNumber1: {
      type: Number,
      required: true
    },
    contactNumber2: {
      type: Number
    },
    unit: {
      type: String,
      required: true
    },
    dobMM: {
      type: String,
      required: true
    },
    dobYY: {
      type: Number,
      required: true
    },
    origin: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    campus: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Chore (Custom Validation)
const BioForm = mongoose.model('BioForm', bioSchema);

module.exports = BioForm;
