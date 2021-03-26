const {
        ipcRenderer
} = require("electron");

ipcRenderer.send("get-suppliers");

$('#addproduct').click(function () {
        // let addProduct = '';
        let addProduct = `<tr>
    <td><input type="text" class="form-control text-center" name="product_name[]"
            placeholder="Enter Product name or Code" id='productname-0'>
    </td>
    <td><input type="text" class="form-control req amnt" name="product_qty[]" id="amount-0"
            onkeypress="return isNumber(event)" onkeyup="rowTotal('0'), billUpyog()"
            autocomplete="off" value="1"></td>
    <td><input type="text" class="form-control req prc" name="product_price[]" id="price-0"
            onkeypress="return isNumber(event)" onkeyup="rowTotal('0'), billUpyog()"
            autocomplete="off"></td>
    <td><input type="text" class="form-control vat " name="product_tax[]" id="vat-0"
            onkeypress="return isNumber(event)" onkeyup="rowTotal('0'), billUpyog()"
            autocomplete="off"></td>
    <td class="text-center" id="texttaxa-0">0</td>
    <td><input type="text" class="form-control discount" name="product_discount[]"
            onkeypress="return isNumber(event)" id="discount-0" onkeyup="rowTotal('0'), billUpyog()"
            autocomplete="off"></td>
    <td><span class="currenty">$</span>
        <strong><span class='ttlText' id="result-0">0</span></strong></td>
    <td class="text-center">

    </td>
    <input type="hidden" name="taxa[]" id="taxa-0" value="0">
    <input type="hidden" name="disca[]" id="disca-0" value="0">
    <input type="hidden" class="ttInput" name="product_subtotal[]" id="total-0" value="0">
    <input type="hidden" class="pdIn" name="pid[]" id="pid-0" value="0">
    <input type="hidden" name="unit[]" id="unit-0" value=""><input type="hidden" name="hsn[]"
        id="hsn-0" value="">
</tr>
<tr>
    <td colspan="8"><textarea id="dpid-0" class="form-control" name="product_description[]"
            placeholder="Enter Product description" autocomplete="off"></textarea><br></td>
</tr>`
        $("#addProductRow").append(addProduct);
})