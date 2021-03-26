const { model, Schema }= require('mongoose');

const WarehouseSchema = new Schema({
    wName : {
        type: String,
        required: true
    },
    warehouse_desc: String,
    product: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});


const Warehouse = model('Warehouse', WarehouseSchema);


module.exports = Warehouse;