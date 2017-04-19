// ContactController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
var Contact = require('./Contact');


// CREATES A NEW CONTACT

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

/*
  router.post('/', (req, res) => {
    console.log(req.body)
    res.send('Hello')
  });
*/

// RETURNS ALL THE CONTACTS IN THE DATABASE
router.get('/', function (req, res) {

    Contact.find({}, function (err, contacts) {
        if (err) return res.status(500).send("There was a problem finding the contacts.");
        res.status(200).send(contacts);
    });

});

// GETS A SINGLE CONTACT FROM THE DATABASE
router.get('/:id', function (req, res) {

    Contact.findById(req.params.id, function (err, contact) {
        if (err) return res.status(500).send("There was a problem finding the contact.");
        if (!contact) return res.status(404).send("No contact found.");
        res.status(200).send(contact);
    });

});

// DELETES A CONTACT FROM THE DATABASE
router.delete('/:id', function (req, res) {

    Contact.findByIdAndRemove(req.params.id, function (err, contact) {
        if (err) return res.status(500).send("There was a problem deleting the contact.");
        res.status(200).send("Contact "+ contact.name +" was deleted.");
    });

});

// UPDATES A SINGLE CONTACT IN THE DATABASE
router.put('/:id', function (req, res) {
    
    Contact.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, contact) {
        if (err) return res.status(500).send("There was a problem updating the contact.");
        res.status(200).send(contact);
    });

});

module.exports = router;