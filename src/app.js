const express = require("express");
const dotenv = require("dotenv"); // Require dotenv for environment variables
// Load environment variables from .env file
dotenv.config();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const Messages = require("./utils/messages");

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan("dev")); // HTTP request logger middleware
app.use(cors()); // Enable CORS

const routes = require("./routes");
app.use(routes);

// Handling unmatched routes
app.use("*", (req, res) => {
  res.status(404).json({
    message: Messages.UrlNotExist,
    url: req.originalUrl,
  });
});

app.listen(process.env.PORT, () => {
  console.log("e-Business Server Running Port:4000");
});
