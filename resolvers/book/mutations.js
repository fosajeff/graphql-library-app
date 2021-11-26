const Book = require("../../models/book");
const { ObjectId } = require("mongoose").Types;

const createBook = async (body) => {
  return Book.create({
    ...body,
  });
};

const updateBook = async (body) => {
  return Book.findByIdAndUpdate(body.id, { ...body }, { new: true });
};

const deleteBook = async (id) => {
  return Book.findByIdAndRemove(ObjectId(id));
};

module.exports = {
  createBook,
  updateBook,
  deleteBook,
};
