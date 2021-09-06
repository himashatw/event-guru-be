const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Advertisement = require("../../models/Advertisement");
const Organizer = require("../../models/EventOrganizer");
const Owner = require("../../models/PropertyOwner");

router.get("/usercount", async (req, res) => {
  await User.countDocuments()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

router.get("/adcount", async (req, res) => {
  await Advertisement.countDocuments()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

router.get("/ownercount", async (req, res) => {
  await Owner.countDocuments()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

router.get("/organizercount", async (req, res) => {
  await Organizer.countDocuments()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

router.get("/users", async (req, res) => {
  await User.find({})
    .limit(5)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error: error.message });
    });
});

router.get("/owners", async (req, res) => {
  await Owner.find({})
    .limit(5)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error: error.message });
    });
});

router.get("/organizers", async (req, res) => {
  await Organizer.find({})
    .limit(5)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error: error.message });
    });
});

module.exports = router;
