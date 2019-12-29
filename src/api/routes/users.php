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
    
    $email = $parsedBody[email];

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
    
    $email = $parsedBody[email];
    $name = $parsedBody[name];
    $lastname = $parsedBody[lastname];
    $ww = $parsedBody[ww];
    $typee = $parsedBody[typee];
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
    $userid = $request->getAttribute('grouplink');
    // $userid = (int)$userid;
    $parsedBody = $request->getParsedBody();
    $userstoadd = $parsedBody[userstoadd];

    
    // include 'db.php';
    // $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    // // query
   
    $cb = array('status' => 'success', 'user' => $userstoadd);
    //     convert it all to jSON TODO change result
    $response = json_encode($cb);
    return $response;
}
);





// TODO: Delete specifc user 
$app->get('/deleteuser/{userid}', function (Request $request, Response $response) {
    $userid = $request->getAttribute('userid');

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    $sqlgetdeleteusr =  "DELETE FROM users WHERE id = $userid";
    $stmtgetdeleteusr = $dbh->prepare($sqlgetdeleteusr);
    $stmtgetdeleteusr->execute();
    $resultgetdeleteusr = $stmtgetdeleteusr->fetchAll(PDO::FETCH_ASSOC);

    $cb = array('status' => 'success');

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



// TODO: Delete specifc user 
$app->get('/deleteauser/{userid}', function (Request $request, Response $response) {
    $userid = $request->getAttribute('userid');

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    $sqlgetdeleteusr =  "DELETE FROM ausers WHERE id = $userid";
    $stmtgetdeleteusr = $dbh->prepare($sqlgetdeleteusr);
    $stmtgetdeleteusr->execute();
    $resultgetdeleteusr = $stmtgetdeleteusr->fetchAll(PDO::FETCH_ASSOC);

    $cb = array('status' => 'success');

    //     convert it all to jSON TODO change result
    $response = json_encode($cb);
    return $response;
}
);






// TODO: Edit user
$app->post('/edituser/{userid}', function (Request $request, Response $response) {
    $userid = $request->getAttribute('userid');
    $userid = (int)$userid;
    
    $parsedBody = $request->getParsedBody();
    $email = $parsedBody[email];
    $type = $parsedBody[type];
    

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


// TODO: Edit user
$app->post('/editauser/{userid}', function (Request $request, Response $response) {
    $userid = $request->getAttribute('userid');
    $userid = (int)$userid;
    
    $parsedBody = $request->getParsedBody();
    $email = $parsedBody[email];
    $type = $parsedBody[type];
    $name = $parsedBody[name];
    $lastname = $parsedBody[lastname];
    $ww = $parsedBody[ww];
    

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
    for ($i = 0; $i < 16; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}




?>