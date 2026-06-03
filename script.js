    function addItem() {
     let table = document.getElementById("invoice-items");
     let row   = document.createElement("tr");
  
    row.innerHTML = `
        <td><input type="text" placeholder="Item description" ></td>
        <td><input type="number" class="qty" ></td>
        <td><input type="number" class="price" ></td>
        <td><input type="number" class="amount" readonly></td>
        <td>
            <button class="btn remove-btn" onclick="removeRow(this)">
                X
            </button>
        </td>
    `;
            
        table.appendChild(row);
        attachEvents();

        const sourceRows = document.querySelectorAll("#invoice-items tr");
        const targetBody = document.querySelector("#tbody");

        targetBody.innerHTML = "";

        sourceRows.forEach(row => {
        let newRows = "<tr>";

        row.querySelectorAll("input").forEach(input => {
        newRows += `<td>${input.value}</td>`;
        });

        newRows += "</tr>";
        
         targetBody.innerHTML += newRows;

        for (let i = 0; i < targetBody.length; i++) {
        for (let j = i + 1; j < targetBody.length; j++) {
        if (targetBody[i] === targetBody[j]) {
            targetBody.splice(j, 1);
            j--;
          }
        }
       }

        console.log(targetBody);

});
                            
}

    
function removeRow(button) {
    button.closest("tr").remove();
    calculateTotal();
}



function calculateTotal() {
    
    let tax        =  document.getElementById("tax-rate").value;;
    let subTotal   =  0;
    let taxAmount  =  0;
    let grandTotal =  0;

    document.querySelectorAll("#invoice-items tr").forEach(row => {
        let qty = row.querySelector(".qty").value || 0;
        let price = row.querySelector(".price").value || 0;

        let amount = qty * price;

        row.querySelector(".amount").value = amount.toFixed(2);

        subTotal += amount;
        taxAmount = subTotal * (tax / 100);
        grandTotal = subTotal + taxAmount;

    });
        
        document.getElementById("subTotal").value =
        subTotal.toFixed(2);

    // const taxRate = parseFloat(document.getElementById("taxRate").value) || 0;

    document.getElementById("taxTotal").value =
        taxAmount.toFixed(2);

    document.getElementById("totalAmount").value =
        grandTotal.toFixed(2);

//////////////////////////////////////////////////////////////////////////////

}

let submit = document.querySelector('.submit-btn');

submit.addEventListener('click', send = () => {

    let invoiceNum       = document.getElementById("invoicenum").value;
    let daTe             = document.getElementById("date").value;
    let duedaTe          = document.getElementById("due-date").value;
    let companyName      = document.getElementById("companyname").value;
    let companyAddress   = document.getElementById("companyaddress").value;
    let customerName     = document.getElementById("customername").value;
    let customerAddress  = document.getElementById("customeraddress").value;
    let subTotalValue    = document.getElementById("subTotal").value;
    let taxTotalValue    = document.getElementById("taxTotal").value;
    let totalAmountValue = document.getElementById("totalAmount").value;
    //////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
    let invoiceForm      = document.getElementById("invoice-form");
    let printPage        = document.getElementById("print-area");
    invoiceForm.style.display  = 'none';
    printPage.style.display    = 'grid';
    /////////////////////////////////////////////////////////////////////////
    let dateOutput              = document.getElementById("date-output");
    let duedateOutput           = document.getElementById("due-date-output");
    let invoicenumOutput        = document.getElementById("invoice-num-output");
    let companynameOutput       = document.getElementById("company-name-output");
    let companyaddressOutput    = document.getElementById("company-address-output");
    let customernameOutput      = document.getElementById("customer-name-output");
    let customeraddressOutput   = document.getElementById("customer-address-output");
    let subtotalOutput          = document.getElementById("sub-total-output");
    let taxtotalOutput          = document.getElementById("tax-total-output");
    let totalamountOutput       = document.getElementById("total-amount-output");
//////////////////////////////////////////////////////////////////////////////
    dateOutput.append(daTe);
    duedateOutput.append(duedaTe);
    invoicenumOutput.append(invoiceNum);
    companynameOutput.innerHTML     = companyName;
    companyaddressOutput.innerHTML  = companyAddress;
    customernameOutput.innerHTML    = customerName;
    customeraddressOutput.innerHTML = customerAddress;
    subtotalOutput.append(subTotalValue);
    taxtotalOutput.append(taxTotalValue);
    totalamountOutput.append(totalAmountValue);

});
//////////////////////////////////////////////////////////////////////////////
function attachEvents() {
    document.querySelectorAll(".qty, .price").forEach(input => {
        input.removeEventListener("input", calculateTotal);
        input.addEventListener("input", calculateTotal);
    });
}

attachEvents();
calculateTotal();