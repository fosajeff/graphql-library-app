const Book = require("../../models/book");

const getBooks = async () => await Book.find({}).exec();
const getBook = async (id) => await Book.findById(id).exec();
const getBooksByAuthor = async (authorId) => {
  const books = await Book.find({}).exec();
  const booksByAuthor = books.filter((b) => b.authorId === authorId);
  return booksByAuthor;
};
const getBookAuthor = async (bookId) => {
  const book = await Book.findById(bookId).populate("authorId").exec();
  return book.authorId;
};

module.exports = {
  getBooks,
  getBook,
  getBooksByAuthor,
  getBookAuthor,
};
