var express = require('express');
const User = require("../models/User")
const isAuthenticated = require('../middleware/isAuthenticated');
var router = express.Router();

// GET user profile
router.get('/profile', isAuthenticated, (req, res, next) => {
  User.findById(req.user._id)
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({
        username: foundUser.username,
        email: foundUser.email,
        photo: foundUser.photo,
        // Add other user information as needed
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

/* GET users ID */
router.get('/:id', function(req, res, next) {
  console.log("Hitting get route");
  User.findById(req.params.id)
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(foundUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
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

