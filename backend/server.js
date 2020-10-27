const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// Load environment variables
dotenv.config({ path: "./config/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Set public as static folder
app.use(express.static("public"));

// Use JSON middleware
app.use(express.json());

// Disable cors
app.use(cors());

// Enable morgan
app.use(morgan("dev"));

// Import routes
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

// @route   GET /
// @desc    Information about the API
// @access  Public
// @params  No params
app.get("/", (req, res) => {
  res.send({
    msg: "Try",
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Server is starting on port ${PORT}`)
);
