var countrySelected = function () {
    clearCustomPaymentBox();
    clearPaymentBox();
    updateBtnAmount("","");

    let country = document.getElementById("billing_country").value;
    let currency = "USD";
    if (country === "India") {
        showGSTfield();
        currency = "INR";
    } else if (country === "Select") {
        hideGSTfield();
        currency = "";
    } else {
        hideGSTfield();
        currency = "USD";
    }
    document.getElementById("currency").value = currency;
    setAmountType(currency);
};

var setFinalAmount = function (amount) {
    document.getElementById("amount").value = amount;
};

var setBillingTel = function () {
    var code = document.getElementById("countryCode").value;
    var number = document.getElementById("contactNumber").value;
    document.getElementById("billing_tel").value = code + number;
};


var addOption = function (text, selectElement) {
    var option = document.createElement("option");
    option.text = text;
    selectElement.add(option);
};

var setOptionActive = function (option) {
    document.getElementById(option).classList.add('active');
};

var setOptionInactive = function (option) {
    document.getElementById(option).classList.remove('active');
};

var setINR = function (currency) {
    let currencySymbol = document.getElementById('customCurrency').textContent = '₹';
    setAmountByCurrency(currency,currencySymbol);
};

var setUSD = function (currency) {
    let currencySymbol = document.getElementById('customCurrency').textContent = '$';
    setAmountByCurrency(currency,currencySymbol);
};

function getSelectedCurrency() {
    return getSelectedValue('currency');
}

var getCurrencySymbol = function (currency) {
    if(currency==='INR')
    {
        return '₹';
    }else if(currency==="USD")
    {
        return '$';
    }else{
        return "";
    }
}

var amountMap = {
    "USD": {"op1": 150, "op2": 100, "op3": 50},
    "INR": {"op1": 10000, "op2": 8000, "op3": 5000}
};

var setAmountByCurrency = function (currency,currencySymbol) {
    document.getElementById('op1').textContent = currencySymbol + getAmountForOpField('op1',currency);
    document.getElementById('op2').textContent = currencySymbol + getAmountForOpField('op2',currency);
    document.getElementById('op3').textContent = currencySymbol + getAmountForOpField('op3',currency);
};


var getAmountForOpField = function (fieldName,currency) {
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

var updateCustomPayAmount = function () {
    var amount = document.getElementById('customAmount').value;
    calculateFinalBillingAmount(getSelectedCurrency(),amount);
}

var updateBtnAmount = function (currency, amount) {
    document.getElementById('btn_pay').textContent = "Pay " + getCurrencySymbol(currency) + " " + amount;
    setBillingAmount(amount);
}

var updateButtonState = function (value) {
    switch (value) {
        case 'op1':
            setOptionActive('op1');
            setOptionInactive('op2');
            setOptionInactive('op3');
            break;
        case 'op2':
            setOptionInactive('op1');
            setOptionActive('op2');
            setOptionInactive('op3');
            break;
        case 'op3':
            setOptionInactive('op1');
            setOptionInactive('op2');
            setOptionActive('op3');
            break;
    }
    updateBtnAmountBasedOnOption(getSelectedValue('currency'));
}


var updateBtnAmountBasedOnOption = function (currency) {
    switch (currency) {
        case 'USD':
            if (document.getElementById('op1').classList.contains('active')) {
                amount = "150";
            } else if (document.getElementById('op2').classList.contains('active')) {
                amount = "100";
            } else if (document.getElementById('op3').classList.contains('active')) {
                amount = "50";
            } else {
                amount = "0";
            }
            break;

        case 'INR' :
            if (document.getElementById('op1').classList.contains('active')) {
                amount = "10000";
            } else if (document.getElementById('op2').classList.contains('active')) {
                amount = "8000";
            } else if (document.getElementById('op3').classList.contains('active')) {
                amount = "5000";
            } else {
                amount = "0";
            }
            break;
    }

    calculateFinalBillingAmount(getSelectedCurrency(),amount);

};

function calculateFinalBillingAmount(currency,amount) {

    var txFeePercentage = currency === 'INR' ? 0.02 : 0.0499;
    var expectedAmount = Number(amount);

    var total = calculateTotal(expectedAmount, txFeePercentage);
    var ccAvenueTxFees = calculateTxFee(total, txFeePercentage);
    var gstCCAvenueTxFees = Number(ccAvenueTxFees * 0.18);
    var fmesGST = Number(total - (expectedAmount + ccAvenueTxFees + gstCCAvenueTxFees));

    var paymentGateWayFees = (ccAvenueTxFees+gstCCAvenueTxFees).toFixed(2);

    // document.getElementById("txFeesGST").value = gstCCAvenueTxFees.toFixed(2);

    document.getElementById("selectedAmount").value = getCurrencySymbol(currency)+expectedAmount.toFixed(2);
    document.getElementById("txFee").value = getCurrencySymbol(currency)+paymentGateWayFees;
    document.getElementById("fmesGST").value = getCurrencySymbol(currency)+fmesGST.toFixed(2);
    document.getElementById("TotalAmount").value = getCurrencySymbol(currency)+total.toFixed(2);

    setBillingAmount(total.toFixed(2));
    updateBtnAmount(currency, total.toFixed(2));
}

var setBillingAmount = function (value) {
    setElementValue('amount', value);
}

var setAmountType = function (currency) {
    if (currency === 'INR') {
        setINR(currency);
    } else {
        setUSD(currency);
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
    console.log("Check: ", areNonPaymentFieldsSelected() && arePaymentFieldsSelected());
    setSubmitButtonState(areNonPaymentFieldsSelected() && arePaymentFieldsSelected());
};

var areNonPaymentFieldsSelected = function () {
    // console.log("check Non-Payment");
    return hasValue("billing_name") && hasValue("billing_address") && hasValue("billing_city") && hasValue("billing_state") && hasValue("billing_zip")
};

var arePaymentFieldsSelected = function () {
    // console.log("check Payment");
    return isValueSelected("billing_country") && hasValue("contactNumber") && isNotBlank("emailId") && hasValue("currency") && isAmountSet("amount");
};

var isNotBlank = function (elementID) {
    if (document.getElementById(elementID).value == "") {
        document.getElementById(elementID).style.borderColor = "red";
        return false;
    } else {

        document.getElementById(elementID).style.borderColor = "";
        return true;
    }
};

var isAmountSet = function (elementId) {
    var amountValue = getSelectedValue(elementId);
    if (amountValue === "0") {
        document.getElementById(elementId).style.borderColor = "red";
        return false;
    } else {
        document.getElementById(elementId).style.borderColor = "";
        return true;
    }
};

var isValueSelected = function (elementId) {
    if (document.getElementById(elementId).selectedIndex !== 0) {
        document.getElementById(elementId).style.borderColor = "";
        return true;
    } else {
        document.getElementById(elementId).style.borderColor = "red";
        return false
    }
    // return document.getElementById(elementId).selectedIndex !== 0;
};

var hasValue = function (elementId) {
    if (getSelectedValue(elementId) !== '') {
        document.getElementById(elementId).style.borderColor = "";
        return true;
    } else {
        document.getElementById(elementId).style.borderColor = "red";
        return false;
    }
    // return getSelectedValue(elementId) !== '';
};

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
};

var getSelectedValue = function (elementId) {
    return document.getElementById(elementId).value;
};

var ifAllFilled = function () {
    var check = true;

    if (!hasValue("billing_name")) {
        check = false;
    }

    if (!hasValue("billing_address")) {
        check = false;
    }
    if (!hasValue("billing_city")) {
        check = false;
    }
    if (!hasValue("billing_state")) {
        check = false;
    }
    if (!hasValue("billing_zip")) {
        check = false;
    }

    if (!isValueSelected("billing_country")) {
        check = false;
    }
    if (!hasValue("contactNumber")) {
        check = false
    }
    ;
    if (!hasValue("currency")) {
        check = false
    }
    ;
    if (!isNotBlank("emailId")) {
        check = false
    }
    ;

    if (!isNotBlank("amount") || !isAmountSet("amount")) {
        check = false
        document.getElementById("amountBox").style.border = "solid 1px red";
    } else {
        document.getElementById("amountBox").style.border = "";
    }

    return check;
};


var checkFields = function () {
    if (ifAllFilled()) {
        clickSubmit();
        return true;
    }
};

function clickSubmit() {
    document.getElementById("submit").click();
}

var hideGSTfield = function () {
    document.getElementById('gstField').hidden = true;
};

var showGSTfield = function () {
    document.getElementById('gstField').hidden = false;
};


var calculateTotal = function (expectedAmount, txFeePercentage) {
    var number = (expectedAmount * 1.18) / (1 - (txFeePercentage * 1.3924));
    return Number(number);
};

var calculateTxFee = function (totalAmount, txFeePercent) {
    return Number(totalAmount * txFeePercent);
};