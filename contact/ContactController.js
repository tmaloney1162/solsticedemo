var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
var Contact = require('./Contact');

// create a new contact
router.post('/', function (req, res) {
    Contact.create({
            name : req.body.name,
            company : req.body.company,
            password : req.body.password,
            phone:{
            	work:req.body.phone['work'],
            	home:req.body.phone['home'],
            	mobile:req.body.phone['mobile']
            },
            company : req.body.company,
            favorite: req.body.favorite,
            smallImageURL : req.body.smallImageURL,
            largeImageURL : req.body.largeImageURL,
            email : req.body.email,
            website : req.body.website,
            birthdate : req.body.birthdate,
            address:{
            	street:req.body.address['street'],
            	city:req.body.address['city'],
            	state:req.body.address['state'],
            	country:req.body.address['country'],
            	zip:req.body.address['zip'],
            	latitude:req.body.address['latitude'],
            	longitude:req.body.address['longitude']
            },
        }, 
        function (err, contact) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(contact);
        });
});

// return all the contacts in the database
router.get('/', function (req, res) {
    Contact.find({}, function (err, contacts) {
        if (err) return res.status(500).send("There was a problem finding the contacts.");
        res.status(200).send(contacts);
    });
});

// get a single contact from the database
router.get('/:id', function (req, res) {
    Contact.findById(req.params.id, function (err, contact) {
        if (err) return res.status(500).send("There was a problem finding the contact.");
        if (!contact) return res.status(404).send("No contact found.");
        res.status(200).send(contact);
    });
});

// delete a contact from the database
router.delete('/:id', function (req, res) {
    Contact.findByIdAndRemove(req.params.id, function (err, contact) {
        if (err) return res.status(500).send("There was a problem deleting the contact.");
        res.status(200).send("Contact "+ contact.name +" was deleted.");
    });
});

// update a single contact in the database
router.put('/:id', function (req, res) {
    Contact.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, contact) {
        if (err) return res.status(500).send("There was a problem updating the contact.");
        res.status(200).send(contact);
    });
});

module.exports = router;
