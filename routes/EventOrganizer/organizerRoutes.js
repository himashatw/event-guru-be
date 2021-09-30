const express = require('express');
const router = express.Router();
const PackageRequest = require('../../models/PackageRequest.js');
const EventOrganizer = require('../../models/EventOrganizer');
const Package = require('../../models/Package.js');
const PropertyOwner = require('../../models/PropertyOwner.js');

/** login the event oraganizer */
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    await EventOrganizer.findOne({ email: email, password: password }, (err, eventOrganizer) => {
        if (err) {
            console.log(err)
            return res.status(500).send({
                errors: err.message
            });
        }
        if (!eventOrganizer) {
            return res.status(404).send({
                message: 'email or password is mismatch!',
            });
        }
        return res.status(200).send({
            message: 'Login successfully',
            eventOrganizer
        });
    });
});

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

/***Get all custom packages event organizer added */
router.get('/pending/requests', async (req, res) => {
    await PackageRequest.find({ approve: "pending" })
        .then(data => {
            res.status(200).send({ data: data })
        }).catch(err => {
            res.status(500).send({ data: err.message })
        })
})

/***Update custom packages, event organizer added*/
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

/***delete custom package event organizer added*/
router.delete('/pending/delete/:id', async (req, res) => {
    await PackageRequest.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).send({ data: data })
        }).catch(err => {
            res.status(500).send({ data: err.message })
        })
})

/**Get paticular Pending Packages for update,event organizer added*/
router.get('/pending/get/:id', async (req, res) => {
    await PackageRequest.findById(req.params.id)
        .then(data => {
            res.status(200).send({ data: data })
        }).catch(err => {
            res.send(500).send({ data: err.message });
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

/**Get Package details for dispaly venue of create custom request */
router.get('/custom/view/venue', async (req, res) => {
    await PropertyOwner.find({})
        .then(data => {
            res.status(200).send({ data: data })
        }).catch(err => {
            res.send(500).send({ data: err.message });
        })
});

/**Get the package venue*/
router.get('/custom/view/venue/:id', async (req, res) => {
    await PropertyOwner.findById(req.params.id)
        .then(data => {
            res.status(200).send({ data: data })
        }).catch(err => {
            res.send(500).send({ data: err.message });
        })
})

/**Get Package details for dispaly weddings offers */
router.get('/packages/weddings', async (req, res) => {
    await Package.find({ packageType: "Wedding" })
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(err => {
            res.send(500).send({ data: err.message });
        })
});

/**Get Package details for dispaly party offers*/
router.get('/packages/party', async (req, res) => {
    await Package.find({ packageType: "Party" })
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(err => {
            res.send(500).send({ data: err.message });
        })
});

/**Get Package details for dispaly show offers*/
router.get('/packages/show', async (req, res) => {
    await Package.find({ packageType: "Show" })
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(err => {
            res.send(500).send({ data: err.message });
        })
});

/**Get Package details for dispaly other offers*/
router.get('/packages/other', async (req, res) => {
    await Package.find({ packageType: "Other" })
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(err => {
            res.send(500).send({ data: err.message });
        })
});

/**Search the package title */
router.get('/packages/search/:type/:keyword', async (req, res) => {
    await Package.find({ packageType: req.params.type, packageName: { $regex: '.*' + req.params.keyword + '.*' } })
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(err => {
            res.send(500).send({ data: err.message });
        })
});
/**Find latest offers */
router.get('/packages/latest', async (req, res) => {
    await Package.find().sort({ "updatedAt": -1 }).limit(10)
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(err => {
            res.send(500).send({ data: err.message });
        })
});

/**Search All packages */
router.get('/packages/search/:keyword', async (req, res) => {
    await Package.find({ packageName: { $regex: '.*' + req.params.keyword + '.*' } })
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(err => {
            res.send(500).send({ data: err.message });
        })
});

module.exports = router;