const { app, BrowserWindow, ipcMain } = require('electron')
const ejse = require('ejs-electron')
const multer = require('multer')
// const express = require('express')
// const expressApp = express()
const path = require('path')
const url = require('url')
const Product = require('./models/product');
const Customer = require('./models/customer')
const Supplier = require('./models/supplier')
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/')
//   },
//   filename: function(req, file, cb){
//     cb(null, new Date().toISOString() + file.originalname)
//   }
// })

// const upload = multer({ storage: storage})
// Set env
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'producttion' ? true : false
// console.log(process.platform)

function createWindow () {
  const win = new BrowserWindow({
    title: 'Sales Management Application',
    width: 1016,
    height: 800,
    resizable: isDev ? true : false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })
  // if (isDev){
  //   win.webContents.openDevTools();
  // }

  win.loadFile('views/src/home/index.ejs')
}



app.whenReady().then(createWindow)

// app.get('/addNewProduct', (req, res) => {

//     res.render('src/views/stock/addNewProduct.ejs');
// })
// app.set('views', path.join(__dirname, '../client/views'))
// app.set('view engine', 'ejs');

// DB Connection
const mongoose = require('mongoose');
// const { request } = require('express');
// mongoose.Promise = global.Promise
const dbURL = 'mongodb://localhost/sales_management' //change this if you are using Atlas
mongoose.connect(dbURL, { 
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false
}).then(db => console.log('DB is Connected'))
.catch(db => console.log(err));
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', (error) => {
        console.log(error);
});

// Products

ipcMain.on("new-product", async (e, arg) => {
  console.log(arg);
  // console.log(binary(arg.files.product_img.data))
  const newProduct = new Product(arg);
  const productSaved = await newProduct.save();
  // console.log(productSaved);
  e.reply("new-product-created", JSON.stringify(productSaved));
});

ipcMain.on("get-products", async (e, arg) => {
  const products = await Product.find();
  e.reply("get-products", JSON.stringify(products));
});

ipcMain.on("get-single-product", async (e, arg) => {
  const product = await Product.findById(arg, function(err, docs){
    if(err){
      console.log(err); 
    }else {
      console.log("Result : ", docs); 
    }
  });
  e.reply("get-single-product", JSON.stringify(product));
});

ipcMain.on("delete-product", async (e, args) => {
  const productDeleted = await Product.findByIdAndDelete(args);
  e.reply("delete-product-success", JSON.stringify(productDeleted));
});

ipcMain.on("update-product", async (e, args) => {
  console.log(args);
  const updatedProduct = await Product.findByIdAndUpdate(
    args.idProductToUpdate,
    { 
      pName: args.pName, pCode: args.pCode, product_cat: args.product_cat, product_subcat: args.product_subcat, product_warehouse: args.product_warehouse, product_retail_price: args.product_retail_price, product_order_price: args.product_order_price, default_tax_rate: args.default_tax_rate, default_discount_rate: args.default_discount_rate, product_qty: args.product_qty, product_qty_alert: args.product_qty_alert, unit:args.unit, code_type: args.code_type,code_type_val:args.code_type_val, product_desc: args.product_desc, expiry_date: args.expiry_date, product_img: args.product_img },
    { new: true }
  );
  e.reply("update-product-success", JSON.stringify(updatedProduct));
});


// Customer 

ipcMain.on("new-customer", async (e, arg) => {
  console.log(arg);
  const newCustomer = new Customer(arg);
  const customerSaved = await newCustomer.save();
  console.log(customerSaved);
  e.reply("new-customer-created", JSON.stringify(customerSaved));
});

ipcMain.on("get-customers", async (e, arg) => {
  const customers = await Customer.find();
  e.reply("get-customers", JSON.stringify(customers));
});

ipcMain.on("get-single-customer", async (e, arg) => {
  const customer = await Customer.findById(arg, function(err, docs){
    if(err){
      console.log(err); 
    }else {
      console.log("Result : ", docs); 
    }
  });
  e.reply("get-single-customer", JSON.stringify(customer));
});

ipcMain.on("delete-customer", async (e, args) => {
  const customerDeleted = await Customer.findByIdAndDelete(args);
  e.reply("delete-customer-success", JSON.stringify(customerDeleted));
});

ipcMain.on("update-customer", async (e, args) => {
  console.log(args);
  const updatedCustomer = await Customer.findByIdAndUpdate(
    args.idCustomerToUpdate,
    { 
      cName: args.cName, phone: args.phone, email: args.email, address: args.address, city: args.city, region: args.region, country: args.country, postBox: args.postBox, company: args.company, tax: args.tax,  shippingName: args.shippingName, shippingPhone: args.shippingPhone, shippingEmail: args.shippingEmail, shippingAddress: args.shippingAddress, shippingCity: args.shippingCity, shippingRegion: args.shippingRegion, shippingCountry: args.shippingCountry, shippingPostBox: args.shippingPostBox, shippingCompany: args.shippingCompany},
    { new: true }
  );
  e.reply("update-customer-success", JSON.stringify(updatedCustomer));
});


// Supplier 

ipcMain.on("new-supplier", async (e, arg) => {
  console.log(arg);
  const newSupplier = new Supplier(arg);
  const supplierSaved = await newSupplier.save();
  // console.log(supplierSaved);
  e.reply("new-supplier-created", JSON.stringify(supplierSaved));
});

ipcMain.on("get-suppliers", async (e, arg) => {
  const suppliers = await Supplier.find();
  e.reply("get-suppliers", JSON.stringify(suppliers));
});

ipcMain.on("get-single-supplier", async (e, arg) => {
  const supplier = await Supplier.findById(arg, function(err, docs){
    if(err){
      console.log(err); 
    }else {
      console.log("Result : ", docs); 
    }
  });
  e.reply("get-single-supplier", JSON.stringify(supplier));
});

ipcMain.on("delete-supplier", async (e, args) => {
  const supplierDeleted = await Supplier.findByIdAndDelete(args);
  e.reply("delete-supplier-success", JSON.stringify(supplierDeleted));
});

ipcMain.on("update-supplier", async (e, args) => {
  console.log(args);
  const updatedSupplier = await Supplier.findByIdAndUpdate(
    args.idSupplierToUpdate,
    { 
      sName: args.sName, company: args.company, phone: args.phone, email: args.email, address: args.address, city: args.city, region: args.region, country: args.country, postBox: args.postBox, tax: args.tax },
    { new: true }
  );
  e.reply("update-supplier-success", JSON.stringify(updatedSupplier));
});



app.on('window-all-closed', () => {
    app.quit();
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


// app.on('ready', () => {
//     const mainWindow = new BrowserWindow({});
//     mainWindow.loadURL(`file://${__dirname}/index.html`);
// })


// module.exports = { createWindow };
