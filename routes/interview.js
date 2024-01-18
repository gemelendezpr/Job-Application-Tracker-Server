var express = require('express');
var router = express.Router();

const Interview = require("../models/Interview")
const Company = require('../models/Company')

router.post("/", (req, res, next) => {
  Interview.create(req.body)
    .then((createdInterview) => {
      Company.findByIdAndUpdate(createdInterview.company, {$push: {interviews: createdInterview._id}}, {new: true})
      .then((updatedCompany) => {
        console.log("Interview created ->", updatedCompany, createdInterview);
        res.status(201).json({createdInterview, updatedCompany});
      })
      .catch((error) => {
        console.error("Error while creating the Interview ->", error);
        res.status(500).send({ error: "Failed to create the Interview" });
      })
    })
    .catch((error) => {
      console.error("Error while creating the Interview ->", error);
      res.status(500).send({ error: "Failed to create the Interview" });
    })
});

router.get("/", (req, res, next) => {
    console.log("Hitting get route")
  Interview.find()
    .populate('user company')
    .then((foundInterviews) => {
      console.log(foundInterviews);
      res.status(201).json(foundInterviews);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
});

router.get("/:id", (req, res, next) => {
    console.log("Hitting get route")
  Interview.findById(req.params.id)
    .populate('user company')
    .then((foundInterviews) => {
      console.log(foundInterviews);
      res.status(201).send(foundInterviews);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
});

router.post("/update/:id", (req, res, next) => {
  Interview.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedInterview) => {
      console.log(updatedInterview);
      res.status(200).json(updatedInterview);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
});

router.get('/delete/:id', (req, res, next) => {
    Interview.findByIdAndDelete(req.params.id)
    .then((updatedInterview) => {
        console.log(updatedInterview);
        res.status(200).json(updatedInterview);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
});


module.exports = router; 
