const Author = require("../../models/author");

const getAuthors = async () => await Author.find({}).exec();
const getAuthor = async (id) => await Author.findById(id).exec();

module.exports = {
  getAuthors,
  getAuthor,
};
