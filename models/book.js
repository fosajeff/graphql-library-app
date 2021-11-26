const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    name: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "author" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("book", bookSchema);
