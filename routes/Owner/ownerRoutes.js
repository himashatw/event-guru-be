const express = require("express");
const router = express.Router();
// import PropertyOwner from '../../models/PropertyOwner';
const PropertyOwner = require("../../models/PropertyOwner");
const Package = require("../../models/Package");

router.post("/register", async (req, res) => {
  const propertyOwner = new PropertyOwner(req.body);
  await propertyOwner
    .save()
    .then((data) => {
      res.status(201).send({ data: data });
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

router.post("/newpackage", async (req, res) => {
  const newPackage = new Package(req.body);
  await newPackage
    .save()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

router.get("/packages", async (req, res) => {
  await Package.find({})
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

module.exports = router;
