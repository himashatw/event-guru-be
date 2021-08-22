const express = require('express');
const router = express.Router();
//import PropertyOwner from '../../models/PropertyOwner';

router.post('/register', async (req, res) => {
    const propertyOwner = new PropertyOwner(req.body);
    await propertyOwner.save()
        .then(data => {
            res.status(201).send({ data: data });
        })
        .catch(error => {
            res.status(400).send({ error: error.message });
        });
});

module.exports = router;