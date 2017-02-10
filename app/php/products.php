<?php
    $host_name  = "db668799839.db.1and1.com";
    $database   = "db668799839";
    $user_name  = "dbo668799839";
    $password   = "tottenham1";

    $connect = mysqli_connect($host_name, $user_name, $password, $database);

    if (mysqli_connect_errno()) {
        echo 'Failed to connect to database: '.mysqli_connect_error(). '.';
    }
    else {
        echo 'Database ' .$database. ' successfully selected!';
    }
?>
