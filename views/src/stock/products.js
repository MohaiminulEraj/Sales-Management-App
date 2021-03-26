const {
    ipcRenderer
} = require("electron");
const path = require('path');
const os = require('os');
const {
    get
} = require("http");
function removeLocalSt(){
    localStorage.removeItem('singleProduct');
    localStorage.removeItem('supplier');
}
const productForm = document.querySelector('#productFormId');
const pName = document.querySelector('#pNameId');
const pCode = document.querySelector('#pCodeId');
const product_cat = document.querySelector('#product_catId');
const product_subcat = document.querySelector('#product_subcatId');
const product_warehouse = document.querySelector('#product_warehouseId');
const product_retail_price = document.querySelector('#product_retail_priceId');
const product_order_price = document.querySelector('#product_order_priceId');
const default_tax_rate = document.querySelector('#default_tax_rateId');
const default_discount_rate = document.querySelector('#default_discount_rateId');
const product_qty = document.querySelector('#product_qtyId');
const product_qty_alert = document.querySelector('#product_qty_alertId');
const unit = document.querySelector('#unitId');
const code_type = document.querySelector('#code_typeId');
const code_type_val = document.querySelector('#code_type_valId');
const product_desc = document.querySelector('#product_descId');
const expiry_date = document.querySelector('#expiry_dateId');
const product_img = document.querySelector('#product_imgId');

let updateStatus = false;
let idProductToUpdate = "";

let products = [];
ipcRenderer.send("get-products");
// ipcRenderer.send("get-single-product");
let editProd = false;
function deleteProduct(id) {
    const response = confirm("are you sure you want to delete it?");
    if (response) {
        ipcRenderer.send("delete-product", id);
    }
    return;
}
// let storeProduct = {};



function displayProduct(products) {
    if (products.length > 0 && editProd===false ) {
        for (let i = products.length - 1, j = 0; i >= 0; i--, j++) {
            productList = `<tr>
                                <th scope="row">${j+1}</th>
                                <td>${products[i].pName}</td>
                                <td>${products[i].product_qty}</td>
                                <td>${products[i].product_cat}</td>
                                <td>${products[i].product_warehouse}</td>
                                <td>${products[i].product_retail_price}</td>
                                <td><button style="margin-right:6px;" class="btn btn-info">View</button> <button style="margin-right:6px;" class="btn btn-warning" onClick="selectSingleProduct('${products[i]._id}')" ">Edit</button> <button style="margin-right:6px;" class="btn btn-danger" onClick="deleteProduct('${products[i]._id}')">Delete</button></td>
                            </tr>`
            $("#productList").append(productList)
        }
    //  pName.value = 'testing testing'
        // editProd=false;
        
    }
    console.log("displayProduct()");
}

function selectSingleProduct(id){
    ipcRenderer.send("get-single-product", id);
    // console.log(id);
    window.location.replace('editProduct.ejs');
}

function displaySingleProduct(){
    let data = JSON.parse(localStorage.getItem('singleProduct'));
        pName.value = data.pName;
        pCode.value = data.pCode;
        product_cat.value = data.product_cat;
        product_subcat.value = data.product_subcat;
        product_warehouse.value = data.product_warehouse;
        product_retail_price.value = data.product_retail_price;
        product_order_price.value = data.product_order_price;
        default_tax_rate.value = data.default_tax_rate;
        default_discount_rate.value = data.default_discount_rate;
        product_qty.value = data.product_qty;
        product_qty_alert.value = data.product_qty_alert;
        unit.value = data.unit;
        code_type.value = data.code_type;
        code_type_val.value = data.code_type_val;
        product_desc.value = data.product_desc;
        expiry_date.value = JSON.stringify(data.expiry_date).substr(1,10);
        // product_img.files[0].path = data.product_img;
}


function storeSingleProduct(product){
    localStorage.setItem('singleProduct', JSON.stringify(product));
}




ipcRenderer.on("new-product-created", (e, arg) => {
    console.log(arg);
    const productSaved = JSON.parse(arg);
    products.push(productSaved);
    console.log(products);
    displayProduct(products);
    alert("product Created Successfully");
    // productName.focus();
});

ipcRenderer.on("get-products", (e, args) => {
    const receivedProducts = JSON.parse(args);
    products = receivedProducts;
    displayProduct(products);
});

ipcRenderer.on("get-single-product", (e, args) => {
    const receivedProduct = JSON.parse(args);
    product = receivedProduct;
    // console.log(product)
    storeSingleProduct(product);
});

ipcRenderer.on("delete-product-success", (e, args) => {
    const deletedProduct = JSON.parse(args);
    const newProducts = products.filter(t => {
        return t._id !== deletedProduct._id;
    });
    products = newProducts;
    location.reload();
    displayProduct(products);

});

// ipcRenderer.on("update-product-success", (e, args) => {
//     updateStatus = false;
//     // const updatedProduct = JSON.parse(args);
//     let updatedProduct = JSON.parse(localStorage.getItem('singleProduct'));
//     products = products.map((t, i) => {
//         if (t._id === updatedProduct._id) {
//             t.pName = updatedProduct.pName;
//             // t.description = updatedProduct.description
//         }
//         return t;
//     });
//     displayProduct(products);
// });


