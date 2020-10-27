const express = require("express");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Import DB connection
const db = require("../config/db");

const auth = require("../middleware/auth");

// @route   GET /auth
// @desc    Get current logged in user
// @access  Public/Token
// @params  x-auth-token header in HTTP call
router.get("/", auth, (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "Login token is not valid" });
  }

  db.query("SELECT * FROM users WHERE id = ?", req.user, (err, result) => {
    if (err) {
      return res.status(500).send("User does not exist");
    }

    const user = result[0];

    const { id, firstname, lastname, email, avatar } = user;
    res.send({
      id,
      firstname,
      lastname,
      email,
      avatar,
    });
  });
});

// @route   POST /auth/register
// @desc    Register user
// @access  Public
// @params  {firstname, lastname, email, password}
router.post("/register", (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).send({
      msg: "All fields are required",
    });
  }

  db.query(
    "INSERT INTO users SET ?",
    {
      firstname,
      lastname,
      email,
      password: md5(`${process.env.SALT}${password}`),
    },
    (err, result) => {
      if (err) {
        return res.status(500).send({ err });
      }

      const token = jwt.sign(
        {
          id: result.insertId,
        },
        process.env.JWT_SECRET
      );

      res.send({
        user: {
          id: result.insertId,
          firstname,
          lastname,
          email,
        },
        token,
      });
    }
  );
});

// @route   POST /auth/login
// @desc    Login user
// @access  Public
// @params  {email, password}
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      msg: "All fields are required",
    });
  }

  db.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
    if (err) {
      return res.status(500).send({ err });
    }

    const user = result[0];

    if (user.password === md5(`${process.env.SALT}${password}`)) {
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET
      );

      delete user.password;

      res.send({
        user,
        token,
      });
    } else {
      res.status(401).send({
        msg: "Password is not correct",
      });
    }
  });
});

module.exports = router;
