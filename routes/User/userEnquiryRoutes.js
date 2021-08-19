const express = require('express');
const router = express.Router();
const Enquiry = require('../../models/Enquiry');

/** send enquiry api */
router.post('/user/enquiry', async (req, res) => {
    const enquiry = new Enquiry(req.body);
    await enquiry.save()
        .then(data => {
            res.status(201).send({ data: data });
        })
        .catch(error => {
            res.status(400).send({ error: error.message });
        });
});

/** get enquiry api */
router.get('/user/enquiry/:id', async (req, res) => {
    //get real id into variable and set it
    
    await Enquiry.find({users:_id})
        .then(data => {
            res.status(200).send({ data: data })
        }).catch(error => {
            res.status(400).send({ error: error.message })
        });
});

/** delete enquiry api */
router.delete('/user/enquiry/:id', async (req, res) => {
    await Enquiry.findByIdAndDelete()
        .then(data => {
            res.status(200).send({ data: data })
        }).catch(error => {
            res.status(400).send({ error: error.message })
        });
});

module.exports = router;