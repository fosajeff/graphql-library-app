const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas");
const mongoose = require("mongoose");
const logger = require("winston");

const { MONGODB_URL, PORT } = require("./config");

const app = express();

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  logger.log("info", "Connected to database server");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => logger.log("info", `Server running on PORT ${PORT} 🚀`));
