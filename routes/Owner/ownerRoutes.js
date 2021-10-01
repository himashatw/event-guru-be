const express = require("express");
const router = express.Router();

const PropertyOwner = require("../../models/PropertyOwner");
const Package = require("../../models/Package");
const PackageRequest = require("../../models/PackageRequest");

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  await PropertyOwner.findOne(
    { email: email, password: password, accountActive: true },
    (err, propertyOwner) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          errors: err.message,
        });
      }
      if (!propertyOwner) {
        return res.status(404).send({
          message: "Email or Password is Mismatch!",
        });
      }
      return res.status(200).send({
        message: "Login successfully",
        propertyOwner,
      });
    }
  );
});

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

//get new packages
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

//get all packagea
router.get("/packages", async (req, res) => {
  await Package.find({})
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

//get wedding packages
router.get("/packages/weddings", async (req, res) => {
  await Package.find({packageType:"Wedding"})
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

//get party packages
router.get("/packages/party", async (req, res) => {
  await Package.find({packageType:"Party"})
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

//get concert packages
router.get("/packages/concert", async (req, res) => {
  await Package.find({packageType:"Concert"})
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});


//get other packages
router.get("/packages/other", async (req, res) => {
  await Package.find({packageType:"Other"})
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
});

//get one package details
router.get("/packages/get/:id", async(req,res)=>{
  await Package.findById(req.params.id)
  .then(data =>{
    res.status(200).send({data:data})
  }).catch(err=>{
    res.status(500).send({data: err.message});
  })
})

//update package
router.put('/packages/update/:id', (req, res) => {
  Package.findByIdAndUpdate(req.params.id,
    { $set: req.body })
    .then(() => res.json("Updated"))
    .catch(err => console.log(err))
})

//delete package
router.delete('/packages/delete/:id', (req, res) => {
  Package.findByIdAndDelete(req.params.id)
    .then(() => res.json("deleted!"))
    .catch(err => console.log(err))
})

//view custom packages
router.get('/package/custom/:ownerId',(req,res)=>{
  PackageRequest.find({venue: req.params.ownerId, approve:"pending"})
  .then((result) => {
    res.status(200).json({ result });
  })
  .catch((error) => {
    res.status(422).json({ error });
  });
})

router.patch(`/package/customer/:packageId`, async (req, res) => {
  PackageRequest.findByIdAndUpdate(req.params.packageId,{approve:req.body.approvestatus})
  .then((result) => {
    res.status(200).json({ result });
  })
  .catch((error) => {
    res.status(422).json({ error });
  });
})

module.exports = router;
