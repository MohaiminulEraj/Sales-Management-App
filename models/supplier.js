const { model, Schema }= require('mongoose');

const SupplierSchema = new Schema({
    sName : {
        type: String,
        required: true
    },
    company: String,
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
    tax: String
});


const Supplier = model('Supplier', SupplierSchema);


module.exports = Supplier;