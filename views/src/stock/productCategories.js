const {
    ipcRenderer
} = require("electron");



let products = [];
ipcRenderer.send("get-products");
// displayProduct();
function displayProduct(products) {

    let generalC = healthC = computerC = homeC = toysC = automotiveC = musicC = toolsC = 0;
    let generalCh = healthCh = computerCh = homeCh = toysCh = automotiveCh = musicCh = toolsCh = false;
    let generalQty = healthQty = computerQty = homeQty = toysQty = automotiveQty = musicQty = toolsQty = 0;

    if (products.length > 0) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].product_cat === 'General') {
                generalC++;
                generalQty += products[i].product_qty;
                generalCh=true;
            } else if (products[i].product_cat === 'Health') {
                healthC++;
                healthQty += products[i].product_qty;
                healthCh=true;
            } else if (products[i].product_cat === 'Home') {
                homeC++;
                homeQty += products[i].product_qty;
                homeCh=true;
            } else if (products[i].product_cat === 'Computer') {
                computerC++;
                computerQty += products[i].product_qty;
                computerCh=true;
            } else if (products[i].product_cat === 'Toys') {
                toysC++;
                toysQty += products[i].product_qty;
                toysCh=true;
            } else if (products[i].product_cat === 'Automotive') {
                automotiveC++;
                automotiveQty += products[i].product_qty;
                automotiveCh=true;
            } else if (products[i].product_cat === 'Music') {
                musicC++;
                musicQty += products[i].product_qty;
                musicCh=true;
            } else if (products[i].product_cat === 'Tools') {
                toolsC++;
                toolsQty += products[i].product_qty;
                toolsCh=true;
            }

        }
        let i = 0;

            if (generalCh) {
                let productList = `<tr>
                                <th scope="row">${++i}</th>
                                <td>General</td>
                                <td>${generalC}</td>
                                <td>${generalQty}</td>
                                <td><button style="margin-right:6px;" class="btn btn-info">View</button> <button style="margin-right:6px;" class="btn btn-warning">Edit</button> <button style="margin-right:6px;" class="btn btn-danger">Delete</button></td>
                            </tr>`

                $("#productCatagoryList").append(productList)
            } if (healthCh) {
                let productList = `<tr>
                                <th scope="row">${++i}</th>
                                <td>Health</td>
                                <td>${healthC}</td>
                                <td>${healthQty}</td>
                                <td><button style="margin-right:6px;" class="btn btn-info">View</button> <button style="margin-right:6px;" class="btn btn-warning">Edit</button> <button style="margin-right:6px;" class="btn btn-danger">Delete</button></td>
                            </tr>`

                $("#productCatagoryList").append(productList)
            } if (homeCh) {
                let productList = `<tr>
                                <th scope="row">${++i}</th>
                                <td>Home</td>
                                <td>${homeC}</td>
                                <td>${homeQty}</td>
                                <td><button style="margin-right:6px;" class="btn btn-info">View</button> <button style="margin-right:6px;" class="btn btn-warning">Edit</button> <button style="margin-right:6px;" class="btn btn-danger">Delete</button></td>
                            </tr>`

                $("#productCatagoryList").append(productList)
            } if (computerCh) {
                let productList = `<tr>
                                <th scope="row">${++i}</th>
                                <td>Computer</td>
                                <td>${computerC}</td>
                                <td>${computerQty}</td>
                                <td><button style="margin-right:6px;" class="btn btn-info">View</button> <button style="margin-right:6px;" class="btn btn-warning">Edit</button> <button style="margin-right:6px;" class="btn btn-danger">Delete</button></td>
                            </tr>`

                $("#productCatagoryList").append(productList)
            } if (toysCh) {
                let productList = `<tr>
                                <th scope="row">${++i}</th>
                                <td>Toys</td>
                                <td>${toysC}</td>
                                <td>${toysQty}</td>
                                <td><button style="margin-right:6px;" class="btn btn-info">View</button> <button style="margin-right:6px;" class="btn btn-warning">Edit</button> <button style="margin-right:6px;" class="btn btn-danger">Delete</button></td>
                            </tr>`

                $("#productCatagoryList").append(productList)
            } if (automotiveCh) {
                let productList = `<tr>
                                <th scope="row">${++i}</th>
                                <td>Automotive</td>
                                <td>${automotiveC}</td>
                                <td>${automotiveQty}</td>
                                <td><button style="margin-right:6px;" class="btn btn-info">View</button> <button style="margin-right:6px;" class="btn btn-warning">Edit</button> <button style="margin-right:6px;" class="btn btn-danger">Delete</button></td>
                            </tr>`

                $("#productCatagoryList").append(productList)
            } if (musicCh) {
                let productList = `<tr>
                                <th scope="row">${++i}</th>
                                <td>Music</td>
                                <td>${musicC}</td>
                                <td>${musicQty}</td>
                                <td><button style="margin-right:6px;" class="btn btn-info">View</button> <button style="margin-right:6px;" class="btn btn-warning">Edit</button> <button style="margin-right:6px;" class="btn btn-danger">Delete</button></td>
                            </tr>`

                $("#productCatagoryList").append(productList)
            } if (toolsCh) {
                let productList = `<tr>
                                <th scope="row">${++i}</th>
                                <td>Tools</td>
                                <td>${toolsC}</td>
                                <td>${toolsQty}</td>
                                <td><button style="margin-right:6px;" class="btn btn-info">View</button> <button style="margin-right:6px;" class="btn btn-warning">Edit</button> <button style="margin-right:6px;" class="btn btn-danger">Delete</button></td>
                            </tr>`

                $("#productCatagoryList").append(productList)
            }
        
            // let productList = `<tr>
            //                     <th scope="row">${i+1}</th>
            //                     <td>${products[i].product_cat}</td>
            //                     <td>${products[i].product_qty}</td>
            //                     <td>${products[i].product_retail_price}</td>
            //                     <td>${products[i].pName}</td>
            //                     <td>${products[i].product_warehouse}</td>
            //                 </tr>`

            // $("#productCatagoryList").append(productList)

    }

}


ipcRenderer.on("get-products", (e, args) => {
    const receivedProducts = JSON.parse(args);
    products = receivedProducts;
    displayProduct(products);
});