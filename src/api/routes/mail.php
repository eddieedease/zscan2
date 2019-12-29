<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// TODO: implement PhPMailer and send mail through this
// TODO: Send email to specific user
// TODO: Send mass mail to whole group (Who haven't gotten the email yet)


// API
// a API CALL TO LOG THE FORM Result
// check if 'mailsend
$app->post('/sendlinktouser/{userid}', function (Request $request, Response $response) {
    $userid = $request->getAttribute('userid');
    $userid = (int)$userid;
    $parsedBody = $request->getParsedBody();
    
    $name = $parsedBody[name];
    $name = addcslashes($name, "'");
    $lastname = $parsedBody[lastname];
    $lastname = addcslashes($lastname, "'");
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

// TODO: Send mass mail to whole group (Who haven't gotten the email yet)
// check if 'mailsend
$app->post('/sendlinktobulk/{groupid}', function (Request $request, Response $response) {
    $groupid = $request->getAttribute('groupid');
    $groupid = (int)$userid;
    $parsedBody = $request->getParsedBody();
    
    $name = $parsedBody[name];
    $name = addcslashes($name, "'");
    $lastname = $parsedBody[lastname];
    $lastname = addcslashes($lastname, "'");
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
?>