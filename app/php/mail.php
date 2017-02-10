<?php

// configure
$from = 'info@norlux.uk';
$sendTo = 'info@norlux.uk';
$subject = 'Enquiry from Norlux UK';
$fields = array('name' => 'Name', 'company' => 'Company', 'email' => 'Email', 'phone' => 'Phone', 'message' => 'Message'); // array variable name => Text to appear in the email
$okMessage = 'Your message has successfully sent. Thank you!';
$errorMessage = 'There was an error while submitting the form. Please try again later';

// let's do the sending

try
{
    $emailText = nl2br("You have new enquiry from Norlux UK:\n\n");

    foreach ($_POST as $key => $value) {

        if (isset($fields[$key])) {
            $emailText .= nl2br("$fields[$key]: $value\n\n");
        }
    }

    $headers = array('Content-Type: text/html; charset="UTF-8";',
        'From: ' . $from,
        'Reply-To: ' . $_POST['email'],
        'Return-Path: ' . $from,
    );

    mail($sendTo, $subject, $emailText, implode("\n", $headers));

    $responseArray = array('type' => 'success', 'message' => $okMessage);
}
catch (\Exception $e)
{
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
}
else {
    echo $responseArray['message'];
}
