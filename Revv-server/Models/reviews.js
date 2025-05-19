const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});
const reviewModel = mongoose.model("reviews", reviewSchema);
module.exports = reviewModel;
