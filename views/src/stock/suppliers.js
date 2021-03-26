const {
    ipcRenderer
} = require("electron");
let validator = require('validator');

function removeLocalSt() {
    localStorage.removeItem('supplier');
    localStorage.removeItem('singleProduct');
    localStorage.removeItem('customer');
}
let supplierForm = document.getElementById('supplierForm');
let sName = document.getElementById('sNameId');
let company = document.getElementById('companyId');
let phone = document.getElementById('phoneId');
let email = document.getElementById('emailId');
let address = document.getElementById('addressId');
let city = document.getElementById('cityId');
let region = document.getElementById('regionId')
let country = document.getElementById('countryId');
let postBox = document.getElementById('postBoxId');
let tax = document.getElementById('taxId');


let updateStatus = false;
let idsupplierToUpdate = "";

let suppliers = [];

ipcRenderer.send("get-suppliers");



function deleteSupplier(id) {
    const response = confirm("are you sure you want to delete it?");
    if (response) {
        ipcRenderer.send("delete-supplier", id);
    }
    return;
}

function displaySupplier(suppliers) {
    if (suppliers.length > 0) {
        for (let i = suppliers.length-1, j=0; i>=0; i--, j++) {
            supplierList = `<tr>
                                <th scope="row">${j+1}</th>
                                <td>${suppliers[i].sName}</td>
                                <td>${suppliers[i].address}</td>
                                <td>${suppliers[i].email}</td>
                                <td>${suppliers[i].phone}</td>
                                <td><button style="margin-right:6px;" class="btn btn-info">View</button> <button style="margin-right:6px;" class="btn btn-warning" onClick="selectSingleSupplier('${suppliers[i]._id}')">Edit</button> <button style="margin-right:6px;" class="btn btn-danger" onClick="deleteSupplier('${suppliers[i]._id}')">Delete</button></td>
                            </tr>`
            $("#supplierList").append(supplierList)
        }

    }

}

function selectSingleSupplier(id) {
    ipcRenderer.send("get-single-supplier", id);
    window.location.replace('editSupplier.ejs');
}

function storeSingleSupplier(supplier) {
    localStorage.setItem('supplier', JSON.stringify(supplier));
}

function displaySingleSupplier() {
    let data = JSON.parse(localStorage.getItem('supplier'));
    sName.value = data.sName;
    company.value = data.company;
    phone.value = data.phone;
    email.value = data.email;
    address.value = data.address;
    city.value = data.city;
    region.value = data.region;
    country.value = data.country;
    postBox.value = data.postBox;
    tax.value = data.tax;
}

ipcRenderer.on("get-suppliers", (e, args) => {
    const receivedSuppliers = JSON.parse(args);
    suppliers = receivedSuppliers;
    displaySupplier(suppliers);
});

ipcRenderer.on("get-single-supplier", (e, args) => {
    const receivedSupplier = JSON.parse(args);
    supplier = receivedSupplier;
    // console.log(supplier)
    storeSingleSupplier(supplier);
});

ipcRenderer.on("delete-supplier-success", (e, args) => {
    const deletedSupplier = JSON.parse(args);
    const newSuppliers = suppliers.filter(t => {
        return t._id !== deletedSupplier._id;
    });
    suppliers = newSuppliers;
    location.reload();
    displaySupplier(suppliers);

});

ipcRenderer.on("new-supplier-created", (e, arg) => {
    console.log(arg);
    const supplierSaved = JSON.parse(arg);
    suppliers.push(supplierSaved);
    console.log(suppliers);
    rendersuppliers(suppliers);
    alert("Supplier Created Successfully");
    // supplierName.focus();
});