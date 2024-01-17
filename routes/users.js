var express = require('express');
const User = require("../models/User")
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

