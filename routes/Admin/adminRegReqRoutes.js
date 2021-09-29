const express = require("express");
const router = express.Router();
const PropertyOwner = require("../../models/PropertyOwner");

router.get("/getrequests", async (req, res) => {
  await PropertyOwner.find({ accountActive: false })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

router.patch("/acceptrequest/:ownerId", async (req, res) => {
  await PropertyOwner.findByIdAndUpdate(
    req.params.ownerId,
    { accountActive: true },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/deleterequest/:ownerId", async (req, res) => {
  await PropertyOwner.findByIdAndDelete(req.params.ownerId)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
