<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>IJME Fees Collection</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
    <link rel="stylesheet" href="css/customStyle.css">


    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>

    <script type="text/javascript" src="js/moment.js"></script>
    <script type="text/javascript" src="js/lodash-min.js"></script>
    <script type="text/javascript" src="js/countries.js"></script>
    <script src="js/customScript.js"></script>

    <script>
        var countryList = countries();
        var amount = "0";
        var currency = "$";
        var baseServerURL = 'https://ijme.in/IjmeFeesCollectionApp/';

        var displayCountries = function () {
            var selectElement = document.getElementById("billing_country");
            addOption('Select', selectElement);
            var allCountries = _.sortBy(countryList["low"].concat(countryList["low-middle"], countryList["upper-middle"], countryList["high"]));
            allCountries.forEach(function (country) {
                addOption(country, selectElement)
            });
        };

        var countrySelected = function () {
            var country = document.getElementById("billing_country").value;
            var currency="USD";
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
            document.getElementById("currency").value=currency;
            setAmountType(currency);
            setFinalAmount();
        };

        var setFinalAmount = function () {
            document.getElementById("amount").value = amount;
        }

        var setBillingTel = function () {
            var code = document.getElementById("countryCode").value;
            var number = document.getElementById("contactNumber").value;
            document.getElementById("billing_tel").value = code+number;
        }




    </script>

    <script>
        window.onload = function () {
            displayCountries();
            setElementValue('tid', moment().format('YYMMDDhhmmss'));
            setElementValue('currency', 'USD');
            setElementValue("order_id", '00000000000000' + moment().format('YYYYMMDDhhmmssss'));
            setElementValueWithURL('redirect_url', 'ccavResponseHandler.php');
            setElementValueWithURL('cancel_url', 'ccavResponseHandler.php');
            hideGSTfield();

        };
    </script>
</head>
<body>

<nav class="navbar">
<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 navbar-brand">
    <a href="https://ijme.in"><img src="https://ijme.in/wp-content/themes/ijme/images/logo.jpg" alt="Page Header" class="ijmelogo"></a>
</div>

    <div class="top-nav-btnI top-nb c-logo">
        <a href="http://ijme.in/nbc-20140321/index.php/14th-wcb-india/index/pages/view/home-page">
            <img src="https://ijme.in/wp-content/themes/ijme/images/nbc.jpg" alt=""></a>
    </div>
    <div class="top-nav-btnI border"><a href="http://ijme.in/nbc-20140321/index.php/14th-wcb-india/index/pages/view/home-page"><img src="https://ijme.in/wp-content/themes/ijme/images/14-world-congress-of-bioethics-logo.jpg" alt="14th-wcb"></a></div>
    <div class="top-nav-btnI border"><a href="https://ijme.in/about-us/fmes/overview/"><img src="https://ijme.in/wp-content/themes/ijme/images/search.jpg" alt="fmes"></a></div>

</nav>


<div class="container">
    <div class="card">
        <div class="card-header">
            <h6>Please Enter the following details</h6>
        </div>
        <form method="post" action="ccavRequestHandler.php" role="form">
            <div class="card-body">
<!--                <h5 class="card-title">Please Enter the following details</h5>-->
            <!--Personal Details -->
            <div class="form-row">
            <div class="form-group col-md-6">
                    <label for="billing_name">Name*</label>
                    <input type="text" name="billing_name" id="billing_name" class="form-control"  required">
                </div>
            </div>

            <div class="form-group">
                <label for="billing_address">Address*</label>
                <input type="text" name="billing_address" class="form-control" id="billing_address"  required >
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="billing_city">City*</label>
                    <input type="text" name="billing_city" class="form-control" id="billing_city" required >
                </div>
                <div class="form-group col-md-4">
                    <label for="billing_state">State*</label>
                    <input type="text" name="billing_state" id="billing_state" class="form-control" required >
                </div>
                <div class="form-group col-md-2">
                    <label for="billing_zip">Zip/Postal*</label>
                    <input type="text" name="billing_zip" class="form-control" id="billing_zip" required >
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="billing_country">Country*</label>
                    <select id="billing_country" name="billing_country" class="form-control" onchange="countrySelected()" required>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="col-sm-12 col-md-6">
                <label for="countryCode">Contact Number*</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">+</span>
                    </div>
                    <input type="text" id="countryCode" class="form-control col-2" aria-label="Country Code" aria-describedby="basic-addon1" maxlength="3" onkeypress="return isNumberKey(event)">
                    <input type="text" id="contactNumber" class="form-control col-auto"  aria-label="Country Code" aria-describedby="basic-addon1" onchange="setBillingTel()" onkeypress="return isNumberKey(event)"  maxlength="10">
                    </div>
                </div>

            </div>

            <div class="form-row">
                <div class="col-sm-12 col-md-6">
                <label for="emailId">Email ID*</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><i class="fa fa-envelope text-info"></i></div>
                    </div>
                    <input type="email" class="form-control" id="emailId" name="billing_email"  required>
                </div>
                </div>
            </div>
            </div>
            <div class="card-body">
            <h5 class="card-title">Payment Details</h5>

        <div class="form-row paymentBox" >
            <div class="col-sm-12 paymentInnerBox" id="amountBox">
            <div class="btn-group btn-group-lg btn-group-toggle"  id="paymentButtonGroup" onclick="clearCustomPaymentBox()">
                <label class="btn btn-outline-secondary" id="op1" onclick="updateButtonState('op1')">
                    <input type="radio" name="options" id="option1" autocomplete="off" >$150
                </label>
                <label class="btn btn-outline-secondary" id="op2" onclick="updateButtonState('op2')">
                    <input type="radio" name="options" id="option2" autocomplete="off">$100
                </label>
                <label class="btn btn-outline-secondary" id="op3" onclick="updateButtonState('op3')">
                    <input type="radio" name="options" id="option3" autocomplete="off">$50
                </label>
            </div>
            <div class="btn-group input-group input-group-lg ml-2 customAmount" role="group">
                <div class="input-group-prepend">
                    <div class="input-group-text" id="customCurrency">$</div>
                </div>
                <input type="text" class="form-control" id="customAmount" name="customAmount" placeholder="Any Other Amount" onkeypress="clearPaymentBox()" onkeyup="updateCustomPayAmount()">
            </div>
            </div>
        </div>

        <div class="clearfix"></div>
        <br>

        <div class="form-row">
            <div class="col-sm-12 col-md-6" id="gstField">
        <label for="gstIn">GST Number</label>
        <input type="text" id="gstIn" class="form-control" aria-describedby="gstHelpBdy">
        <small id="passwordHelpBlock" class="form-text text-muted">Please provide only if applicable</small>
            </div>
        </div>


        <div class="clearfix"></div>
        <br><br>
        <div class="form-row">
            <div class="btn btn-info btn-lg btn-block" id="btn_pay" onclick="checkFields()">Pay</div>
        </div>

            <input type="text" name="language" value="en" hidden/>
            <input type="text" name="integration_type" value="iframe_normal" hidden/>
            <input type="text" name="redirect_url" id="redirect_url" hidden/>
            <input type="text" name="cancel_url" id="cancel_url" hidden/>
            <input type="text" name="tid" id="tid" hidden/>
            <input type="text" name="merchant_id" value="146983" hidden/>
            <input type="text" name="order_id" id="order_id" hidden/>
            <input type="text" name="currency" id="currency" hidden>
            <input type="text" name="amount" id="amount" hidden>
            <input type="text" name="billing_tel" id="billing_tel" hidden>
                <input type="submit" value="Submit" id="submit" hidden>

        </div>
        </form>

    </div>

</div>


</body>
</html>