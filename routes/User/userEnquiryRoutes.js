const express = require('express');
const router = express.Router();
const Enquiry = require('../../models/Enquiry');

router.post('/add', async (req, res) => {
    const enquiry = new Enquiry(req.body);
    await enquiry.save()
        .then(data => {
            res.status(201).send({ data: data });
        })
        .catch(error => {
            res.status(400).send({ error: error.message });
        })
})

router.get('/all', async (req, res) => {
    await Enquiry.find({})
        .then(enquiry => {
            res.status(200).send({ data: enquiry })
        }).catch(error => {
            res.status(400).send({ error: error.message })
        })

})


router.delete('/:id', async (req, res) => {
    await Enquiry.find({})
        .then(attendees => {
            res.status(200).send({ data: attendees })
        }).catch(error => {
            res.status(400).send({ error: error.message })
        })

})

export default router;