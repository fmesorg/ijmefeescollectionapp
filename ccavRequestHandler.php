<html>
<head>
    <title> Iframe</title>
</head>
<body>
<center>
    <?php include('Crypto.php') ?>
    <?php include('accessDetails.php') ?>
    <?php
    error_reporting(-1);
    $working_key = CCAVENUE_WORKING_KEY;
    $access_code = CCAVENUE_ACCESS_CODE;

    $merchant_data = setMerchantValue($_POST);
    $encrypted_data = encrypt($merchant_data, $working_key); // Method for encrypting the data.
//    https://secure.ccavenue.com       https://test.ccavenue.com/
    $production_url = 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=' . $encrypted_data . '&access_code=' . $access_code;
    ?>
    <iframe src="<?php echo $production_url ?>" id="paymentFrame" width="482" height="450" frameborder="0" scrolling="No"></iframe>

    <script type="text/javascript" src="js/jquery-1.7.2.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            window.addEventListener('message', function (e) {
                $("#paymentFrame").css("height", e.data['newHeight'] + 'px');
            }, false);

        });
    </script>
</center>
</body>
</html>

<?php function setMerchantValue($post){
    $merchant_data='';

    $merchant_data= 'amount='.$post['amount'].'&';
    $merchant_data.= 'billing_name='.$post['billing_name'].'&';
    $merchant_data.= 'billing_address='.$post['billing_address'].'&';
    $merchant_data.= 'billing_city='.$post['billing_city'].'&';
    $merchant_data.= 'billing_state='.$post['billing_state'].'&';
    $merchant_data.= 'billing_zip='.$post['billing_zip'].'&';
    $merchant_data.= 'billing_country='.$post['billing_country'].'&';
    $merchant_data.= 'billing_email='.$post['billing_email'].'&';
    $merchant_data.= 'language='.$post['language'].'&';
    $merchant_data.= 'integration_type='.$post['integration_type'].'&';
    $merchant_data.= 'redirect_url='.$post['redirect_url'].'&';
    $merchant_data.= 'merchant_param1='.$post['refrerUrl'].'&';
    $merchant_data.= 'cancel_url='.$post['cancel_url'].'&';
    $merchant_data.= 'tid='.$post['tid'].'&';
    $merchant_data.= 'merchant_id='.$post['merchant_id'].'&';
    $merchant_data.= 'order_id='.$post['order_id'].'&';
    $merchant_data.= 'currency='.$post['currency'].'&';
    $merchant_data.= 'billing_tel='.$post['billing_tel'].'&';

    return $merchant_data;
}