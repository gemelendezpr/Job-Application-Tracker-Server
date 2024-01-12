var express = require("express");
var router = express.Router();

const CompanyJob = require("../models/CompanyJob");

// Create a new CompanyJob
router.post("/", (req, res, next) => {
  CompanyJob.create(req.body)
    .then((createdCompanyJob) => {
      console.log("CompanyJob created ->", createdCompanyJob);
      res.status(201).send(createdCompanyJob);
    })
    .catch((error) => {
      console.error("Error while creating the CompanyJob ->", error);
      res.status(500).send({ error: "Failed to create the CompanyJob" });
    });
});

//when creating the company job on the frontend take the industry to lower case  

//Retrieve all CompanyJobs
router.get("/", (req, res, next) => {
  console.log("Hitting get route");
  CompanyJob.find()
    .then((foundCompanyJobs) => {
      console.log(foundCompanyJobs);
      res.status(201).send(foundCompanyJobs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Update a CompanyJob by ID
router.post("/update/:id", (req, res, next) => {
  CompanyJob.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedCompanyJob) => {
      console.log(updatedCompanyJob);
      res.status(200).send(updatedCompanyJob);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Delete a CompanyJob by ID
router.get("/delete/:id", (req, res, next) => {
  CompanyJob.findByIdAndDelete(req.params.id)
    .then((updatedCompanyJob) => {
      console.log(updatedCompanyJob);
      res.status(200).send(updatedCompanyJob);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Search or Filter by Criteria
router.get("/search", (req, res, next) => {
  const { industry, location, companyName } = req.query;

  // Build a dynamic query based on provided criteria
  const query = {};
  if (industry) {  
    query.industry = { '$regex': industry, $options: 'i' };
  }
  if (location) query.location = { '$regex': location, $options: 'i' };
  if (companyName) query.companyName = { '$regex': companyName, $options: 'i' };

  // { username: { '$regex': username, $options: 'i' } }

  console.log("This is the query ===>", query)

  CompanyJob.find(query)
    .then((filteredCompanyJobs) => {
      console.log(filteredCompanyJobs);
      res.status(200).send(filteredCompanyJobs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Pagination
router.get("/page/:pageNumber", (req, res, next) => {
  const pageSize = 10; // Adjust as needed
  const pageNumber = req.params.pageNumber || 1;

  CompanyJob.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .then((companyJobs) => {
      console.log(companyJobs);
      res.status(200).send(companyJobs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Count
router.get("/count", (req, res, next) => {
    CompanyJob.countDocuments()
    .then((count) => {
        console.log('Total CompanyJobs:', count);
        res.status(200).send({ count });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
});

// Sorting
router.get("/sort/:sortBy", (req, res, next) => {
    const sortBy = req.params.sortBy || 'companyName'; // Default to sorting by companyName

    CompanyJob.find().sort(sortBy)
        .then((sortedCompanyJobs) => {
            console.log(sortedCompanyJobs);
            res.status(200).send(sortedCompanyJobs);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
});

//Retrieve a specific CompanyJob by ID

router.get("/details/:id", (req, res, next) => {
    console.log("Hitting get route");
    CompanyJob.findById(req.params.id)
      .then((foundCompanyJobs) => {
        console.log(foundCompanyJobs);
        res.status(201).send(foundCompanyJobs);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  });


module.exports = router;
