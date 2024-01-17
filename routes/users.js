var express = require('express');
const User = require("../models/User")
const isAuthenticated = require('../middleware/isAuthenticated');
var router = express.Router();

/* GET users ID */
router.get('/:id', function(req, res, next) {
  console.log("Hitting get route");
  User.findById(req.params.id)
  .then((foundUsers) => {
    console.log(foundUsers);
    res.status(201).send(foundUsers);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

// GET user profile
router.get('/profile', isAuthenticated, (req, res, next) => {
  User.findById(req.user.id)
    .then((foundUser) => {
      res.status(200).json({
        username: foundUser.username,
        email: foundUser.email,
        photo: foundUser.photo,
        // Add other user information as needed
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST update user by ID
router.post('/update/:id', (req, res, next) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  User.findByIdAndUpdate(userId, updatedUserData, { new: true })
    .then((updatedUser) => {
      console.log(updatedUser);
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

