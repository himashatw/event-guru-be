const express = require('express');
const router = express.Router();
const PropertyOwner = require('../../models/PropertyOwner');

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    await PropertyOwner.findOne({ email: email, password: password }, (err, propertyOwner) => {
        if (err) {
            console.log(err)
            return res.status(500).send({
                errors: err.message
            });
        }
        if (!propertyOwner) {
            return res.status(404).send({
                message: 'email or password is mismatch!',
            });
        }
        return res.status(200).send({
            message: 'Login successfully'
        });
    });
});

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