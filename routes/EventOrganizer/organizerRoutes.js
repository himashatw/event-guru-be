const express = require('express');
const router = express.Router();
const PackageRequest = require('../../models/PackageRequest.js');

router.post('/register', async (req, res) => {
    const user = new User(req.body);
    await user.save()
        .then(data => {
            res.status(201).send({ data: data });
        })
        .catch(error => {
            res.status(400).send({ error: error.message });
        })
})



router.post('/add/request', async (req, res) => {
    const packageRequest = new PackageRequest(req.body);
    await packageRequest.save()
        .then(data => {
            res.status(200).send({ data: data })
        }).catch(err => {
            res.status(500).send({ data: err.message })
        })
})

router.get('/pending/requests', async (req, res) => {
    await PackageRequest.find({})
        .then(data => {
            res.status(200).send({ data: data })
        }).catch(err => {
            res.status(500).send({ data: err.message })
        })
})


module.exports = router;