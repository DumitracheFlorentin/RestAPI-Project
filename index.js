const express = require("express");

// Require dotenv
require("dotenv").config();

// Init a server
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create routes
app.use("/books", require("./routes/books"));

// Create PORT
const PORT = process.env.PORT || 5000;

// Listen the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}!`);
});
