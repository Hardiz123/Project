const mongoose = require("mongoose");

const birdSchema = new mongoose.Schema({
  name: {
    required: true,
     type: String,
  },
  size: {
     type: String,
    required: true,
  },
  color: {
     type: String,
    required: true,
  },
  weight: {
     type: Number,
    required: true,
  },
});
const Bird = mongoose.model("Bird",birdSchema)
module.exports = Bird