<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
// API

// TODO: Delete specifc user
$app->get('/sendmassmail', function (Request $request, Response $response) {
   
    
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    

    // TODO:
    // Get Groups that are still active and not expired
    $datenow = date("Y-m-d"); 

    // Check if the groupname is already taken
    $sql_getgroups = "SELECT * FROM groups WHERE validto > '$datenow'";
    $stmt_getgroups = $dbh->prepare($sql_getgroups);
    $stmt_getgroups->execute();
    $result_getgroups = $stmt_getgroups->fetchAll(PDO::FETCH_ASSOC);

    // We muste make a user array to fetch the thingies
    $prefix1 = $idstring1 = '';
    foreach ($result_getgroups as $group) {
        $idstring1 .= $prefix1 . '' . $group['id'] . '';
        $prefix1 = ', ';
    }



    // TODO:
    // GET user of this groups (multiple) that have not filled in the thingie
    // Check if the groupname is already taken
    $sql_getusers = "SELECT id FROM users WHERE filled = 0 AND grouplink IN ($idstring1)";
    $stmt_getusers = $dbh->prepare($sql_getusers);
    $stmt_getusers->execute();
    $result_getusers = $stmt_getusers->fetchAll(PDO::FETCH_ASSOC);

    // result_getusers now has the userID's.
    // Now just send the mail





    // TODO:
    // Eventually use own API send mail to user when this is nessy



    $cb = array('status' => 'success', 'case' => $result_getusers);

    //     convert it all to jSON TODO change result
    $response = json_encode($cb);
    return $response;
}
);
