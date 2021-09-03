const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const ContactUs = require('../../models/ContactUs');

/** user login api */
router.post('/user/login', async (req, res) => {
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
            message: 'Login successfully',
            user
        });
    });
});

/** user register api */
router.post('/user/register', async (req, res) => {
    const user = new User(req.body);
    await user.save()
        .then(data => {
            res.status(201).send({ data: data });
        })
        .catch(error => {
            res.status(400).send({ error: error.message });
        });
});

/** logged user data retrieve api */
router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    console.log("logged user id "+userId);
    await User.find({_id:userId})
        .then(data => {
            res.status(201).send({ data: data });
        })
        .catch(error => {
            res.status(400).send({ error: error.message });
        });
});

// /** user update api */
// router.put('/user/register', async (req, res) => {
//     const user = new User(req.body);
//     await user.save()
//         .then(data => {
//             res.status(201).send({ data: data });
//         })
//         .catch(error => {
//             res.status(400).send({ error: error.message });
//         })
// })

// /** user delete api */
// router.delete('/user/register', async (req, res) => {
//     const user = new User(req.body);
//     await user.save()
//         .then(data => {
//             res.status(201).send({ data: data });
//         })
//         .catch(error => {
//             res.status(400).send({ error: error.message });
//         })
// })

/** contactus api */
router.post('/visitor/contactus', async (req, res) => {
    const contactUs = new ContactUs(req.body);
    await contactUs.save()
        .then(data => {
            res.status(201).send({ data: data });
        })
        .catch(error => {
            res.status(400).send({ error: error.message });
        });
});

module.exports = router;