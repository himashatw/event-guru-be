const express = require('express');
const router = express.Router();
const User = require('../../models/User');


router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    await User.findOne({ email: email, password: password }, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(500).send({
                errors: err.message
            });
        }

        if (!user) {
            return res.status(404).send({
                message: 'email or password is mismatch!',
            });
        }

        return res.status(200).send({
            message: 'Login successfully'
        })
    })
})

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

router.post('/contactus', async (req, res) => {
    const attendee = new Attendee(req.body);
    await attendee.save()
        .then(data => {
            res.status(201).send({ data: data });
        })
        .catch(error => {
            res.status(400).send({ error: error.message });
        })
})

export default router;