if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT || 5000,
};
