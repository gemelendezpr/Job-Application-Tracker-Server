var express = require('express');
var router = express.Router();

const AppliedJob = require("../models/AppliedJob")

router.post("/", (req, res, next) => {
  AppliedJob.create(req.body)
    .then((createdAppliedJob) => {
      console.log("AppliedJob created ->", createdAppliedJob);
      res.status(201).send(createdAppliedJob);
    })
    .catch((error) => {
      console.error("Error while creating the AppliedJob ->", error);
      res.status(500).send({ error: "Failed to create the AppliedJob" });
    })
});

router.get("/", (req, res, next) => {
    console.log("Hitting get route")
  AppliedJob.find()
    .then((foundAppliedJobs) => {
      console.log(foundAppliedJobs);
      res.status(201).send(foundAppliedJobs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
});

router.get("/:id", (req, res, next) => {
    console.log("Hitting get route")
  AppliedJob.findById(req.params.id)
    .then((foundAppliedJobs) => {
      console.log(foundAppliedJobs);
      res.status(201).send(foundAppliedJobs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
});

router.post("/update/:id", (req, res, next) => {
  AppliedJob.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedAppliedJob) => {
      console.log(updatedAppliedJob);
      res.status(200).send(updatedAppliedJob);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
});

router.get('/delete/:id', (req, res, next) => {
    AppliedJob.findByIdAndDelete(req.params.id)
    .then((updatedAppliedJob) => {
        console.log(updatedAppliedJob);
        res.status(200).send(updatedAppliedJob);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      })
});


module.exports = router; 
