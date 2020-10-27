const express = require("express");

const router = express.Router();

// Import DB connection
const db = require("../config/db");

// @route   GET /users
// @desc    Get all users
// @access  Admin
// @params  No params
router.get("/", (req, res) => {
  db.query(
    "SELECT id,FirstName,LastName,EmailAddress,Password FROM users",
    (err, users) => {
      res.send(users);
    }
  );
});

// @route   GET /users/:id
// @desc    Get single user
// @access  Private/user
// @params  id
router.get("/:id", (req, res) => {
  db.query(
    "SELECT id,FirstName,LastName,EmailAddress,Password FROM users WHERE id = ?",
    req.params.id,
    (err, users) => {
      res.send(users[0]);
    }
  );
});

// @route   GET /users/:id/orders
// @desc    Get all the orders from single user
// @access  Private/User
// @params  id
router.get("/:id/orders", (req, res) => {
  db.query(
    "SELECT * FROM orders WHERE user_id = ?",
    req.params.id,
    (err, orders) => {
      res.send(orders);
    }
  );
});

// @route   POST /users
// @desc    Create new user
// @access  Admin/User
// @params  {user}
router.post("/", (req, res) => {
  db.query("INSERT INTO users SET ?", req.body, (err, user) => {
    if (err) return res.status(400).send(err);
    res.send({
      id: user.insertId,
      ...req.body,
    });
  });
});

// @route   PUT /users
// @desc    Update single user
// @access  Admin/User
// @params  {user}
router.put("/:id", (req, res) => {
  db.query(
    "UPDATE users SET ? WHERE id = ?",
    [req.body, req.params.id],
    (err, user) => {
      if (err) return res.status(400).send(err);
      res.send(user);
    }
  );
});

// @route   DELETE /users
// @desc    Delete single user
// @access  Admin/User
// @params  {user}
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", req.params.id, (err, user) => {
    if (err) return res.status(400).send(err);
    res.send({});
  });
});

module.exports = router;
