const mongoose = require("mongoose");

const sightingSchema = new mongoose.Schema({
  species: {
    required: true,
    type: String,
  },
  datetime: {
    type:Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});
const Sigting = mongoose.model("Sigting", sightingSchema);
module.exports = Sigting;
