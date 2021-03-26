const {
    ipcRenderer
} = require("electron");
let validator = require('validator');

function removeLocalSt() {
    localStorage.removeItem('customer');
    localStorage.removeItem('supplier');
    localStorage.removeItem('singleProduct');
}

let clientForm = document.getElementById('clientForm');
let cName = document.getElementById('cNameId');
let shippingName = document.getElementById('shippingNameId');
let phone = document.getElementById('phoneId');
let shippingPhone = document.getElementById('shippingPhoneId');
let email = document.getElementById('emailId');
let shippingEmail = document.getElementById('shippingEmailId');
let address = document.getElementById('addressId');
let shippingAddress = document.getElementById('shippingAddressId');
let city = document.getElementById('cityId');
let shippingCity = document.getElementById('shippingCityId');
let region = document.getElementById('regionId')
let shippingRegion = document.getElementById('shippingRegionId');
let country = document.getElementById('countryId');
let shippingCountry = document.getElementById('shippingCountryId');
let postBox = document.getElementById('postBoxId');
let shippingPostBox = document.getElementById('shippingPostBoxId');
let company = document.getElementById('companyId');
let shippingCompany = document.getElementById('shippingCompanyId');
let tax = document.getElementById('taxId');


function SetBilling(checked) {
    if (checked) {
        shippingName.value = cName.value;
        shippingPhone.value = phone.value;
        shippingEmail.value = email.value;
        shippingAddress.value = address.value;
        shippingCity.value = city.value;
        shippingRegion.value = region.value;
        shippingCountry.value = country.value;
        shippingPostBox.value = postBox.value;
        shippingCompany.value = company.value;
    } else {
        shippingName.value = '';
        shippingPhone.value = '';
        shippingEmail.value = '';
        shippingAddress.value = '';
        shippingCity.value = '';
        shippingRegion.value = '';
        shippingCountry.value = '';
        shippingPostBox.value = '';
        shippingCompany.value = '';
    }
}

let updateStatus = false;
let idcustomerToUpdate = "";

let customers = [];

ipcRenderer.send("get-customers");

// document.getElementById("customerSubmitBtn").addEventListener("click", function (e) {

//     if (validator.isMobilePhone(phone.value, ['bn-BD']) && validator.isEmail(email.value) && validator.isMobilePhone(shippingPhone.value, ['bn-BD']) && validator.isEmail(shippingEmail.value)) {
//         const customer = {
//             cName: cName.value,
//             phone: phone.value,
//             email: email.value,
//             address: address.value,
//             city: city.value,
//             region: region.value,
//             country: country.value,
//             postBox: postBox.value,
//             company: company.value,
//             tax: tax.value,
//             shippingName: shippingName.value,
//             shippingPhone: shippingPhone.value,
//             shippingEmail: shippingEmail.value,
//             shippingAddress: shippingAddress.value,
//             shippingCity: shippingCity.value,
//             shippingRegion: shippingRegion.value,
//             shippingCountry: shippingCountry.value,
//             shippingPostBox: shippingPostBox.value,
//             shippingCompany: shippingCompany.value
//         }

//         if (customer.length > 0) {
//             alert("Thank You");
//         }
//         console.log(updateStatus);

//         if (!updateStatus) {
//             ipcRenderer.send("new-customer", customer);
//         } else {
//             ipcRenderer.send("update-customer", {
//                 ...customer,
//                 idcustomerToUpdate
//             });
//         }
//     } else {
//         e.preventDefault();
//         if (!validator.isMobilePhone(phone.value, ['bn-BD'])) {
//             return alert("Please put a valid Phone Number");
//         } else if (!validator.isEmail(email.value)) {
//             return alert("Please Put a valid Email Address");
//         } else if (!validator.isMobilePhone(shippingPhone.value, ['bn-BD'])) {
//             return alert("Please put a valid Shipping Phone Number");
//         } else if (!validator.isEmail(shippingEmail.value)) {
//             return alert("Please Put a valid Shipping Email Address");
//         }
//     }

//     // customerForm.reset();
// });

function deleteCustomer(id) {
    const response = confirm("are you sure you want to delete it?");
    if (response) {
        ipcRenderer.send("delete-customer", id);
    }
    return;
}

function displayCustomer(customers) {
    if (customers.length > 0) {
        for (let i = customers.length-1, j=0; i >=0; i--, j++) {
            customerList = `<tr>
                                <th scope="row">${j+1}</th>
                                <td>${customers[i].cName}</td>
                                <td>${customers[i].address}</td>
                                <td>${customers[i].email}</td>
                                <td>${customers[i].phone}</td>
                                <td><button style="margin-right:6px;" class="btn btn-info">View</button> <button style="margin-right:6px;" class="btn btn-warning" onClick="selectSingleCustomer('${customers[i]._id}')">Edit</button> <button style="margin-right:6px;" class="btn btn-danger" onClick="deleteCustomer('${customers[i]._id}')">Delete</button></td>
                            </tr>`
            $("#customerList").append(customerList)
        }

    }

}

function selectSingleCustomer(id) {
    ipcRenderer.send('get-single-customer', id);
    window.location.replace('editClient.ejs');
}

function storeSingleCustomer(customer) {
    localStorage.setItem('customer', JSON.stringify(customer));
}

function displaySingleCustomer() {
    let data = JSON.parse(localStorage.getItem('customer'));
    cName.value = data.cName;
    phone.value = data.phone;
    email.value = data.email;
    address.value = data.address;
    city.value = data.city;
    region.value = data.region;
    country.value = data.country;
    postBox.value = data.postBox;
    company.value = data.company;
    tax.value = data.tax;
    shippingName.value = data.shippingName;
    shippingPhone.value = data.shippingPhone;
    shippingEmail.value = data.shippingEmail;
    shippingAddress.value = data.shippingAddress;
    shippingCity.value = data.shippingCity;
    shippingRegion.value = data.shippingRegion;
    shippingCountry.value = data.shippingCountry;
    shippingPostBox.value = data.shippingPostBox;
    shippingCompany.value = data.shippingCompany
}

ipcRenderer.on("get-customers", (e, args) => {
    const receivedCustomers = JSON.parse(args);
    customers = receivedCustomers;
    displayCustomer(customers);
});

ipcRenderer.on("get-single-customer", (e, args) => {
    const receivedCustomer = JSON.parse(args);
    customer = receivedCustomer;
    // console.log(customer)
    storeSingleCustomer(customer);
});

ipcRenderer.on("delete-customer-success", (e, args) => {
    const deletedCustomer = JSON.parse(args);
    const newCustomers = customers.filter(t => {
        return t._id !== deletedCustomer._id;
    });
    customers = newCustomers;
    location.reload();
    displayCustomer(customers);

});

ipcRenderer.on("new-customer-created", (e, arg) => {
    console.log(arg);
    const customerSaved = JSON.parse(arg);
    customers.push(customerSaved);
    console.log(customers);
    displayCustomer(customers);
    alert("Customer Created Successfully");
    customerName.focus();
});