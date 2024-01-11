var express = require('express');
const User = require("../models/User")
var router = express.Router();

/* GET users listing. */
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

module.exports = router;

