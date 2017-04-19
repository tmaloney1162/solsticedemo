// Contact.js
var mongoose = require('mongoose');  

var ContactSchema = new mongoose.Schema({  
  name: String,
  company: String,
  favorite: Boolean,
	smallImageURL: String,
	largeImageURL: String,
	email: String,
	website: String,
	birthdate: String,
  phone: {
    work: String,
    home: String,
    mobile: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
    latitude: Number,
    longitude: Number
  },	 
});
mongoose.model('Contact', ContactSchema);


module.exports = mongoose.model('Contact');