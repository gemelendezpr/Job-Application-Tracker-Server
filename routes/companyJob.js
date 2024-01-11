var express = require("express");
var router = express.Router();

const CompanyJob = require("../models/CompanyJob")

router.post("/", (req, res, next) => {
  CompanyJob.create(req.body)
    .then((createdCompanyJob) => {
      console.log("CompanyJob created ->", createdCompanyJob);
      res.status(201).send(createdCompanyJob);
    })
    .catch((error) => {
      console.error("Error while creating the CompanyJob ->", error);
      res.status(500).send({ error: "Failed to create the CompanyJob" });
    })
});

router.get("/", (req, res, next) => {
    console.log("Hitting get route")
  CompanyJob.find()
    .then((foundCompanyJobs) => {
      console.log(foundCompanyJobs);
      res.status(201).send(foundCompanyJobs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
});

router.get("/:id", (req, res, next) => {
    console.log("Hitting get route")
  CompanyJob.findById(req.params.id)
    .then((foundCompanyJobs) => {
      console.log(foundCompanyJobs);
      res.status(201).send(foundCompanyJobs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
});

router.post("/update/:id", (req, res, next) => {
  CompanyJob.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedCompanyJob) => {
      console.log(updatedCompanyJob);
      res.status(200).send(updatedCompanyJob);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
});

router.get('/delete/:id', (req, res, next) => {
    CompanyJob.findByIdAndDelete(req.params.id)
    .then((updatedCompanyJob) => {
        console.log(updatedCompanyJob);
        res.status(200).send(updatedCompanyJob);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      })
});


module.exports = router;
