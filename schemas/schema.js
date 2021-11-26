const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const { authorQuery, authorMutation } = require("../resolvers/author");
const { bookQuery, bookMutation } = require("../resolvers/book");

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by an author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: async (book) => await bookQuery.getBookAuthor(book.id),
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents an author of a book",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: async (author) => await bookQuery.getBooksByAuthor(author.id),
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType), // custom GraphQL type
      description: "List of all Books",
      resolve: async () => await bookQuery.getBooks(),
    },
    book: {
      type: BookType,
      description: "Single book",
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (_, args) => await bookQuery.getBook(args.id),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of all Authors",
      resolve: async () => await authorQuery.getAuthors(),
    },
    author: {
      type: AuthorType,
      description: "Single author",
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (_, args) => await authorQuery.getAuthor(args.id),
    },
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a book",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        await bookMutation.createBook({
          name: args.name,
          authorId: args.authorId,
        });
      },
    },
    updateBook: {
      type: BookType,
      description: "Update a book",
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        await bookMutation.updateBook({
          id: args.id,
          name: args.name,
          authorId: args.authorId,
        });
      },
    },
    deleteBook: {
      type: BookType,
      description: "Update a book",
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        await bookMutation.deleteBook({ id: args.id });
      },
    },

    addAuthor: {
      type: AuthorType,
      description: "Add an author",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) =>
        await authorMutation.createAuthor({ name: args.name }),
    },
    updateAuthor: {
      type: AuthorType,
      description: "Update an author",
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) =>
        await authorMutation.updateAuthor({ id: args.id, name: args.name }),
    },
    deleteAuthor: {
      type: AuthorType,
      description: "Delete a author",
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) =>
        await authorMutation.deleteAuthor({ id: args.id }),
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutation,
});
