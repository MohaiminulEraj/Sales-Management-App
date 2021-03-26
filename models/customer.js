const { model, Schema }= require('mongoose');

const CustomerSchema = new Schema({
    cName : {
        type: String,
        required: true
    },
    phone :{
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    address : String,
    city: String,
    region: String,
    country: String,
    postBox: String,
    company: String,
    tax: String,
    shippingName: {
        type: String,
        required: true
    },
    shippingPhone: { 
        type: String, 
        required: true
    },
    shippingEmail: { 
        type: String, 
        required: true
    },
    shippingAddress: String,
    shippingCity: String,
    shippingRegion: String,
    shippingCountry: String,
    shippingPostBox: String,
    shippingCompany: String

});


const Customer = model('Customer', CustomerSchema);


module.exports = Customer;