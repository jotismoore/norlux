<?php

// configure
$from = 'info@norlux.uk';
$sendTo = 'info@norlux.uk';
$subject = 'Enquiry on Norlux UK';
$fields = array('name' => 'Name', 'company' => 'Company', 'email' => 'Email', 'phone' => 'Phone', 'message' => 'Message'); // array variable name => Text to appear in the email
$okMessage = 'Your message has successfully sent. Thank you, I will get back to you soon!';
$errorMessage = 'There was an error while submitting the form. Please try again later';

// let's do the sending

try
{
    $emailText = "You have new enquiry on Norlux UK\n\n";

    foreach ($_POST as $key => $value) {

        if (isset($fields[$key])) {
            $emailText .= "$fields[$key]: $value\n";
        }
    }

    $headers = array('Content-Type: text/html; charset="UTF-8";',
        'From: ' . $from,
        'Reply-To: ' . $from,
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
