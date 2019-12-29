
<?php

header('Access-Control-Allow-Origin: *');

        // set up the connection variables
        include 'db.php';
        // connect to the database
        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
        // NOTE fixing the api over here
        // NOTE 4 pieces [0] gemeenten [1] instrument [2] uploads [3] about

        //NOTE basis
        // a query get all the correct records from the gemeenten table
        $sqlgemeenten = 'SELECT * FROM gemeenten';
        // use prepared statements, even if not strictly required is good practice
        $stmtgemeenten = $dbh->prepare($sqlgemeenten);
        // execute the query
        $stmtgemeenten->execute();
        // fetch the results into an array
        $resultgemeenten = $stmtgemeenten->fetchAll(PDO::FETCH_ASSOC);

        //NOTE instrument
        $sqlinstrument = 'SELECT * FROM instrument';
        $stmtinstrument = $dbh->prepare($sqlinstrument);
        $stmtinstrument->execute();
        $resultinstrument= $stmtinstrument->fetchAll(PDO::FETCH_ASSOC);

        //NOTE uplaods
        $sqluploads = 'SELECT * FROM uploads';
        $stmtuploads = $dbh->prepare($sqluploads);
        $stmtuploads->execute();
        $resultuploads = $stmtuploads->fetchAll(PDO::FETCH_ASSOC);


        //NOTE uplaods
        $sqlabout = 'SELECT * FROM about';
        $stmtabout = $dbh->prepare($sqlabout);
        $stmtabout->execute();
        $resultabout = $stmtabout->fetchAll(PDO::FETCH_ASSOC);



        // NOTE colleting everything for converting
        $result = array();
        array_push($result, $resultgemeenten, $resultinstrument, $resultuploads, $resultabout);

        // convert it all to jSON TODO change result
        $json = json_encode($result);

        // undo PDO connection
        $dbh = null;

        // echo the json string
        echo $json;
?>
