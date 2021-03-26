// const mongoose = require('mongoose');
const { model, Schema }= require('mongoose');

const ProductSchema = new Schema({
    pName : {
        type: String,
        required: true
    },
    pCode :String,
    product_cat : {
        type: String,
        required: true
    },
    product_subcat : String,
    product_warehouse: {
        type: String,
        required: true
        // type: Schema.Types.ObjectId,
        // ref: 'Warehouse'
    },
    product_retail_price: { 
        type: Number, 
        required: true
    },
    product_order_price: Number,
    default_tax_rate: Number,
    default_discount_rate: Number,
    product_qty: {
        type: Number,
        required: true
    },
    product_qty_alert: Number,
    unit: {
        type: String,
        required: true
    },
    code_type: String,
    code_type_val: Number,
    product_desc: String,
    expiry_date: {
        type: Date,
        default: Date.now()
    },
    product_img: {
        type: String,
        default: "/views/assets/images/product-img.png"
    }
});


const Product = model('Product', ProductSchema);


module.exports = Product;