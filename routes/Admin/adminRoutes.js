const express = require("express");
const router = express.Router();
const Advertisement = require("../../models/Advertisement");
const Owner = require("../../models/PropertyOwner");
// router.post("/register", {});
router.post("/newadd", async (req, res) => {
  const newAd = new Advertisement(req.body);
  await newAd
    .save()
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

router.get("/ads", async (req, res) => {
  Advertisement.find({})
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

router.get("/getvenues", async (req, res) => {
  await Owner.find({}, "location")
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

router.patch("/updatead/:adId", async (req, res) => {
  await Advertisement.findByIdAndUpdate(req.params.adId, req.body, {
    new: true,
  })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

router.delete("/deletead/:adId", async (req, res) => {
  await Advertisement.findByIdAndDelete(req.params.adId)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

module.exports = router;
