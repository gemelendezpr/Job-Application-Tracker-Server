var express = require("express");
var router = express.Router();

const Company = require("../models/Company");

// Create a new CompanyJob
router.post("/", (req, res, next) => {
  Company.create(req.body)
    .then((createdCompany) => {
      console.log("Company created ->", createdCompany);
      res.status(201).send(createdCompany);
    })
    .catch((error) => {
      console.error("Error while creating the Company ->", error);
      res.status(500).send({ error: "Failed to create the Company" });
    });
});

//when creating the company job on the frontend take the industry to lower case  

//Retrieve all Companys
router.get("/", (req, res, next) => {
  console.log("Hitting get route");
  Company.find()
    .then((foundCompanys) => {
      console.log(foundCompanys);
      res.status(201).send(foundCompanys);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Update a Company by ID
router.post("/update/:id", (req, res, next) => {
  Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedCompany) => {
      console.log(updatedCompany);
      res.status(200).send(updatedCompany);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Delete a Company by ID
router.get("/delete/:id", (req, res, next) => {
  Company.findByIdAndDelete(req.params.id)
    .then((updatedCompany) => {
      console.log(updatedCompany);
      res.status(200).send(updatedCompany);
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

  Company.find(query)
    .then((filteredCompanys) => {
      console.log(filteredCompanys);
      res.status(200).send(filteredCompanys);
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

  Company.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .then((companys) => {
      console.log(companys);
      res.status(200).send(companys);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Count
router.get("/count", (req, res, next) => {
    Company.countDocuments()
    .then((count) => {
        console.log('Total Companys:', count);
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

    Company.find().sort(sortBy)
        .then((sortedCompanys) => {
            console.log(sortedCompanys);
            res.status(200).send(sortedCompanys);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
});

//Retrieve a specific Company by ID

router.get("/details/:id", (req, res, next) => {
    console.log("Hitting get route");
    Company.findById(req.params.id)
      .then((foundCompanys) => {
        console.log(foundCompanys);
        res.status(201).send(foundCompanys);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  });


module.exports = router;
