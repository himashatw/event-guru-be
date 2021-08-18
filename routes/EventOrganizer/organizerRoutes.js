const express = require('express');
const router = express.Router();
const PackageRequest = require('../../models/PackageRequest.js');
const EventOrganizer = require('../../models/EventOrganizer');

/*** register the event oraganizer*/
router.post('/register', async (req, res) => {
    const eventOrganizer = new EventOrganizer(req.body);
    await eventOrganizer.save()
        .then(data => {
            res.status(201).send({ data: data });
        })
        .catch(error => {
            res.status(400).send({ error: error.message });
        })
})

/***Post custom packages */
router.post('/pending/add', async (req, res) => {
    const packageRequest = new PackageRequest(req.body);
    await packageRequest.save()
        .then(data => {
            res.status(200).send({ data: data })
        }).catch(err => {
            res.status(500).send({ data: err.message })
        })
})
/***Get all custom packages */
router.get('/pending/requests', async (req, res) => {
    await PackageRequest.find({})
        .then(data => {
            res.status(200).send({ data: data })
        }).catch(err => {
            res.status(500).send({ data: err.message })
        })
})
/***Update custom packages */
router.put('/pending/update/:id', async (req, res) => {
    if (req.body && req.params.id) {
        await PackageRequest.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
            .then(data => {
                res.status(200).send({ data: data })
            }).catch(err => {
                res.status(500).send({ data: err.message })
            })
    }
})
/***delete custom package */
router.delete('/pending/delete/:id', async (req, res) => {
    await PackageRequest.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).send({ data: data })
        }).catch(err => {
            res.status(500).send({ data: err.message })
        })
})
/*** Get approval of custom packages*/
router.get('/custom/view/approval', async (req, res) => {
    await PackageRequest.find({ $or: [{ approve: "false" }, { approve: "true" }] })
        .then(data => {
            res.status(200).send({ data: data })
        }).catch(err => {
            res.status(500).send({ data: err.message })
        })

})
module.exports = router;