<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
// API
// LOGIN WITH KEY, give back group ID.

// TODO: Make DOC

// MUST GIVE BACK, groupid, filledin!!! GIVE BACK ID, GROUPID, TYPEID
// this link will be send in the email
$app->get('/login/{userid}/{keyy}', function (Request $request, Response $response) {
    $userid = $request->getAttribute('userid');
    $userid = (int)$userid;
    $keyy = $request->getAttribute('keyy');

    
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);


    // first check type, normal or checklist user. 2 different tables query
    // 2 check key
    // 3 Give back type, userID, groupID


	$sqlgetuser = "SELECT * FROM users WHERE id = '$userid' AND unlockkey = '$keyy'";
    $stmtgetuser = $dbh->prepare($sqlgetuser);
    $stmtgetuser->execute();
    $resultgetuser = $stmtgetuser->fetchAll(PDO::FETCH_ASSOC);

    $keymatch = $resultgetuser[0][unlockkey];

    if ($keyy === $keymatch){
        // right key acces granted

        if ($resultgetuser[0][filled] == 1){
            $data = array('status' => 'already filled');
        } else {
            $data = array('status' => 'success', 'user' => $resultgetuser);
        }

    } else {
        $data = array('status' => 'failed');
    }

    
    $response = json_encode($data);
    return $response;
});



// LOGIN WITH KEY, give back group ID.
$app->post('/admnlogin', function (Request $request, Response $response) {
    
    $parsedBody = $request->getParsedBody();
    $email = $parsedBody[email];
    $pwd = $parsedBody[ww];


    include 'db.php';
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    // SQL QUERY FOR getting group id with key
    $sqlgetuser = "SELECT * FROM ausers WHERE email = '$email'";
    $stmtgetuser = $dbh->prepare($sqlgetuser);
    $stmtgetuser->execute();
    $resultgetuser = $stmtgetuser->fetchAll(PDO::FETCH_ASSOC);
    $aipassword = $resultgetuser[0]['ww'];


    if (md5($pwd) == $aipassword) {
        // succesfull inlog
        $data = array('status' => 'success', 'type' => $resultgetuser[0]['type'], 'aid' => $resultgetuser[0]['id']);
    } else {
        $data = array('status' => 'failed');
    }

    // TODO: MMust also give back the auser type
    // Must also give back the groups which this user may access
    $response = json_encode($data);
    return $response;
});

?>