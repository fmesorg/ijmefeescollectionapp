var addOption = function (text, selectElement) {
    var option = document.createElement("option");
    option.text = text;
    selectElement.add(option);
};

var setActive = function (option) {
    document.getElementById(option).classList.add('active');
};

var setInactive = function (option) {
    document.getElementById(option).classList.remove('active');
};

var setINR = function () {
    currency = document.getElementById('customCurrency').textContent = '₹';
    setAmountByCurrency();
}

var setUSD = function () {
    currency = document.getElementById('customCurrency').textContent = '$';
    setAmountByCurrency();
}

var amountMap = {
    "$": {"op1": 150, "op2": 100, "op3": 50},
    "₹": {"op1": 10000, "op2": 8000, "op3": 5000}
};

var setAmountByCurrency = function () {
    document.getElementById('op1').textContent = currency + getAmountForOpField('op1');
    document.getElementById('op2').textContent = currency + getAmountForOpField('op2');
    document.getElementById('op3').textContent = currency + getAmountForOpField('op3');
};


var getAmountForOpField = function (fieldName) {
    return amountMap[currency][fieldName];
}


var clearPaymentBox = function () {
    document.getElementById('op1').classList.remove('active');
    document.getElementById('op2').classList.remove('active');
    document.getElementById('op3').classList.remove('active');
}

var clearCustomPaymentBox = function () {
    document.getElementById('customAmount').value = "";
}

var updateCustomPayAmount = function(){
    amount = document.getElementById('customAmount').value;
    updatePayAmountButton();
    enableSubmitIfAllFilled();
}

var updatePayAmountButton = function(){
    document.getElementById('btn_pay').textContent = "Pay "+currency+" "+amount;
    setBillingAmount(amount);
}

var updateButtonState = function (value) {
    switch (value) {
        case 'op1':setActive('op1');setInactive('op2');setInactive('op3'); break;
        case 'op2':setInactive('op1');setActive('op2');setInactive('op3'); break;
        case 'op3':setInactive('op1');setInactive('op2');setActive('op3'); break;
    }
    updateBtnPayAmount();
}


var updateBtnPayAmount = function () {
    switch (currency) {
        case '$':
            if(document.getElementById('op1').classList.contains('active')){
                amount = "150";
            }
            else if(document.getElementById('op2').classList.contains('active')){
                amount = "100";
            }
            else if(document.getElementById('op3').classList.contains('active')){
                amount = "50";
            }else {
                amount = "0";
            }
            break;

        case '₹' :if(document.getElementById('op1').classList.contains('active')){
            amount = "1000";
        }
        else if(document.getElementById('op2').classList.contains('active')){
            amount = "8000";
        }
        else if(document.getElementById('op3').classList.contains('active')){
            amount = "5000";
        }else {
            amount = "0";
        }
            break;
    }
    setBillingAmount(amount);
    updatePayAmountButton();
    enableSubmitIfAllFilled();
}

var setBillingAmount = function (value) {
    setElementValue('amount',value);
}

var setAmountType = function (currency) {
    if(currency==='INR'){
        setINR();
    }else{
        setUSD();
    }
}

var setElementValue = function (id, value) {
    document.getElementById(id).value = value;
};

var setElementValueWithURL = function (id, value) {
    setElementValue(id, baseServerURL + value);
};

var setSubmitButtonState = function (enabled) {
    var submitButton = document.getElementById('btn_pay');
    submitButton.disabled = !enabled;
};

var enableSubmitIfAllFilled = function () {
    console.log("Check: ",areNonPaymentFieldsSelected() && arePaymentFieldsSelected());
    setSubmitButtonState(areNonPaymentFieldsSelected() && arePaymentFieldsSelected());
};

var areNonPaymentFieldsSelected = function () {
    // console.log("check Non-Payment");
    return hasValue("billing_name") && hasValue("billing_address") && hasValue("billing_city") && hasValue("billing_state") && hasValue("billing_zip")
};

var arePaymentFieldsSelected = function () {
    // console.log("check Payment");
    return  isValueSelected("billing_country") && hasValue("contactNumber") && isNotBlank("emailId") && hasValue("currency") && isAmountSet("amount");
};

var isNotBlank = function (elementID) {
    if(document.getElementById(elementID).value ==""){
        document.getElementById(elementID).style.borderColor="red";
        return false;
    }else{

        document.getElementById(elementID).style.borderColor="";
        return true;
    }
}

var isAmountSet = function (elementId) {
    var amountValue = getSelectedValue(elementId);
    if(amountValue==="0"){
        document.getElementById(elementId).style.borderColor="red";
        return false;
    }else {
        document.getElementById(elementId).style.borderColor="";
        return true;
    }
};

var isValueSelected = function (elementId) {
    if(document.getElementById(elementId).selectedIndex !== 0){
        document.getElementById(elementId).style.borderColor="";
        return  true;
    }else {
        document.getElementById(elementId).style.borderColor="red";
        return false
    }
    // return document.getElementById(elementId).selectedIndex !== 0;
};

var hasValue = function (elementId) {
    if(getSelectedValue(elementId) !== ''){
        document.getElementById(elementId).style.borderColor="";
        return true;
    }else {
        document.getElementById(elementId).style.borderColor="red";
        return false;
    }
    // return getSelectedValue(elementId) !== '';
};

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

var getSelectedValue = function (elementId) {
    return document.getElementById(elementId).value;
};