const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("author", authorSchema);
