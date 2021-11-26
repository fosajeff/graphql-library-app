const Author = require("../../models/author");
const { ObjectId } = require("mongoose").Types;

const createAuthor = async (body) => {
  return Author.create({
    ...body,
  });
};

const updateAuthor = async (body) => {
  return Author.findByIdAndUpdate(body.id, { ...body }, { new: true });
};

const deleteAuthor = async (id) => {
  return Author.findByIdAndRemove(ObjectId(id));
};

module.exports = {
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
