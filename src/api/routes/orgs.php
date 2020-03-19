<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
// API

// TODO: Delete specifc user
$app->get('/deleteitem/{case}/{iid}', function (Request $request, Response $response) {
    $casee = $request->getAttribute('case');
    $iid = $request->getAttribute('iid');
    
    $iid = (int)$iid;

    // setting up safe pdo connection
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    // set up correct string
    switch ($casee) {
        case "deletegroup":
            $sqlgetdelete = "DELETE FROM groups WHERE id = $iid";
            break;
        case "deleteadmin":
            $sqlgetdelete = "DELETE FROM ausers WHERE id = $iid";
            break;
        case "deletegroupuser":
            $sqlgetdelete = "DELETE FROM users WHERE id = $iid";
            break;
    }

    $stmtgetdelete = $dbh->prepare($sqlgetdelete);
    $stmtgetdelete->execute();
    $resultgetdelete = $stmtgetdelete->fetchAll(PDO::FETCH_ASSOC);

    $cb = array('status' => 'success', 'case' => $casee);

    //     convert it all to jSON TODO change result
    $response = json_encode($cb);
    return $response;
}
);
