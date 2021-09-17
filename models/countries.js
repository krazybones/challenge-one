const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter country name"],
    trim: true,
    maxLength: [200, "country name cannot exceed 200 characters"],
  },

  capital: {
    type: String,
    trim: true
  },

  region: {
    type: String,
    trim: true
  },

  subregion: {
    type: String,
    trim: true
  },

  population: {
    type: Number,
    required: [true, "Please enter population"]
  },

  area: {
    type: String,
  },

  altSpellings: [{
    type: String,
    trim: true
  }],

  mainLanguage: {
    type: Object,
    required: [true, "Please enter main language"],
  },
  /***
   * languages field used for search critera
   */
  languages: [{
    type: Object
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("countries", countrySchema);
