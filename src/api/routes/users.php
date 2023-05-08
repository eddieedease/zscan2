<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// Ok the users, we have 3 types
// 1. users
// 2. checklist users
// 3. admin/ superadmin users - they can login in the backend

// 

// so what calls do we need


$app->post('/createuseringroup/{grouplink}', function (Request $request, Response $response) {
    $grouplink = $request->getAttribute('grouplink');
    $grouplink = (int)$grouplink;
    $parsedBody = $request->getParsedBody();
    
    $email = $parsedBody['email'];

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    $newpass = randomPassword();
    
    // registering
     $sqlregister = "INSERT INTO users (grouplink, email, unlockkey, type, mailsend, filled) VALUES ('$grouplink','$email', '$newpass', 1, 0, 0)";
        
     $stmtregister = $dbh->prepare($sqlregister);
     $stmtregister->execute();
     $resultregister = $stmtregister->fetchAll(PDO::FETCH_ASSOC);

        // query
        $cb = array('status' => 'success');
        //     convert it all to jSON TODO change result
        $response = json_encode($cb);
        return $response;
}
);

// TODO: THERE MUST BE A MAIL SEND TO THE USER WITH THE PWD
// TODO: THERE MUST BE A MAIL SEND TO THE USER WITH THE PWD
// TODO: THERE MUST BE A MAIL SEND TO THE USER WITH THE PWD
// TODO: THERE MUST BE A MAIL SEND TO THE USER WITH THE PWD

$app->post('/createauser', function (Request $request, Response $response) {
    $grouplink = (int)$grouplink;
    $parsedBody = $request->getParsedBody();
    
    $email = $parsedBody['email'];
    $name = $parsedBody['name'];
    $lastname = $parsedBody['lastname'];
    $ww = $parsedBody['ww'];
    $typee = $parsedBody['typee'];
    $typee = (int)$typee;
    $newpwd = md5($ww);
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    // registering
    $sqlregister = "INSERT INTO ausers (name, lastname, email, ww, type) VALUES ('$name','$lastname', '$email', '$newpwd', '$typee')";
    $stmtregister = $dbh->prepare($sqlregister);
    $stmtregister->execute();
    $resultregister = $stmtregister->fetchAll(PDO::FETCH_ASSOC);
    // query
    $cb = array('status' => 'success');
    //     convert it all to jSON TODO change result
    $response = json_encode($cb);
    return $response;
}
);


// TODO: NEEDS ATTENTION, THE BATCH IMPRORT. Userstoadd is array of mail
$app->post('/usersbatchimporttogroup/{grouplink}', function (Request $request, Response $response) {
    // $userid = (int)$userid;
    $parsedBody = $request->getParsedBody();
    $userstoadd = $parsedBody['userstoadd'];


    $groupLink = $request->getAttribute('grouplink');
    $groupLink = (int)$groupLink;

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    // must become  INSERT INTO table (a,b) VALUES (1,2), (2,3), (3,4);
    // $sqlregister = "INSERT INTO users (login, password, token, secret, email, languages_NAME, name, surname, active, user_types_ID) VALUES ('$email','$pwd', '$token', '$secret', '$email','$language','$firstname','$lastname', '$sendemail','$type')";

    // create dynamically ('$email','$pwd', '$token', '$secret', '$email','$language','$firstname','$lastname', '$sendemail','$type')"
    $query = 'INSERT INTO users (grouplink, email, unlockkey, type) VALUES ';
    $query_parts = array();
    $hashes = [];

    for($x=0; $x<count($userstoadd); $x++){

         $userArray = explode(';', $userstoadd[$x][0]);

         // creating random secret and token
         $secret = randomSecret();
         $hashes[$x] = md5($forString);

         $query_parts[] = "('" . $groupLink ."', '" . ($userArray[0]) . "', '" . $secret . "', '1')";
    }



    //  ('$email','$pwd', '$token', '$secret', '$email','$language','$firstname','$lastname', '$sendemail','$type')"
    $query .= implode(',', $query_parts);
        
    
    $stmtregister = $dbh->prepare($query);
    $stmtregister->execute();
    $cb = array('status' => 'success', 'users' => $userstoadd, 'query' => $query);
    //     convert it all to jSON TODO change result
    $response = json_encode($cb);
    return $response;
}
);







// Get Ausers
$app->get('/getausers', function (Request $request, Response $response) {
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    $sqlgetausers =  "SELECT id, name, lastname, email, type FROM ausers";
    $stmtgetausers = $dbh->prepare($sqlgetausers);
    $stmtgetausers->execute();
    $resultgetausers = $stmtgetausers->fetchAll(PDO::FETCH_ASSOC);


    //     convert it all to jSON TODO change result
    $response = json_encode($resultgetausers);
    return $response;
}
);





// TODO: Edit user
$app->post('/edituser/{userid}', function (Request $request, Response $response) {
    $userid = $request->getAttribute('userid');
    $userid = (int)$userid;
    
    $parsedBody = $request->getParsedBody();
    $email = $parsedBody['email'];
    $type = $parsedBody['type'];
    

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    
    // $sqledituser =  "UPDATE users SET email = '$email', login = '$email', name = '$name', surname = '$lastname', user_types_ID = '$type' WHERE id = '$userid'";
    // $stmtedituser = $dbh->prepare($sqledituser);
    // $stmtedituser->execute();
    // $resultedituser = $stmtedituser->fetchAll(PDO::FETCH_ASSOC);
    
    $cb = array('status' => 'success');
    //     convert it all to jSON TODO change result
    $response = json_encode($cb);
    return $response;
}
);

$app->get('/editusertype/{userid}/{usertype}', function (Request $request, Response $response) {
    $userid = $request->getAttribute('userid');
    $userid = (int)$userid;

    $usertype = $request->getAttribute('usertype');
    $usertype = (int)$usertype;
    

    

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    
    $sqledituser =  "UPDATE users SET type = $usertype WHERE id = '$userid'";
    $stmtedituser = $dbh->prepare($sqledituser);
    $stmtedituser->execute();
    $resultedituser = $stmtedituser->fetchAll(PDO::FETCH_ASSOC);
    
    $cb = array('status' => 'success', 'debug' => $sqledituser);
    //     convert it all to jSON TODO change result
    $response = json_encode($cb);
    return $response;
}
);





// TODO: Edit user
$app->post('/editauser/{userid}', function (Request $request, Response $response) {
    $userid = $request->getAttribute('userid');
    $userid = (int)$userid;
    
    $parsedBody = $request->getParsedBody();
    $email = $parsedBody['email'];
    $type = $parsedBody['type'];
    $name = $parsedBody['name'];
    $lastname = $parsedBody['lastname'];
    $ww = $parsedBody['ww'];
    

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    
    if ($ww == ''){
        $sqledituser =  "UPDATE ausers SET name = '$name', lastname = '$lastname', email = '$email', type = '$type' WHERE id = '$userid'";
    } else {
        $newpwd = md5($ww);
        $sqledituser =   "UPDATE ausers SET name = '$name', lastname = '$lastname', email = '$email', type = '$type', ww = '$newpwd' WHERE id = '$userid'";

    }
    
    
    $stmtedituser = $dbh->prepare($sqledituser);
    $stmtedituser->execute();
    $resultedituser = $stmtedituser->fetchAll(PDO::FETCH_ASSOC);
    
    $cb = array('status' => 'success');
    //     convert it all to jSON TODO change result
    $response = json_encode($cb);
    return $response;
}
);

// Function for random link, creates a random unlockkey
function randomPassword() {
    $alphabet = 'abcdefghijklmnopqrstuvwxyz';
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 6; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}


function randomSecret() {
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 6; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}




?>