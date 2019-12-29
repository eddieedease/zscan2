<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
// API
// API CALL
// GET SCORES OF CERTAIN GROUP


// Note: just get the rows, the front end does the calculating
// otherwise, give back that checklist is nog filled in. Front End needs to know!

// gives two arrays: [0] = all normal results, [1] = checklist results

$app->get('/getresultsfromgroup/{groupid}', function (Request $request, Response $response) {
    $groupid = $request->getAttribute('groupid');
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    // SQL QUERY FOR getting group id with key
    $sqlgetresults = "SELECT * FROM results WHERE grouplink = '$groupid'";
    $stmtgetresults = $dbh->prepare($sqlgetresults);
    $stmtgetresults->execute();
    $resultgetresults = $stmtgetresults->fetchAll(PDO::FETCH_ASSOC);


    $sqlgetchecklistres = "SELECT * FROM checkchecklistres WHERE grouplink = '$groupid'";
    $stmtgetchecklistres = $dbh->prepare($sqlgetchecklistres);
    $stmtgetchecklistres->execute();
    $resultgetchecklistres = $stmtgetchecklistres->fetchAll(PDO::FETCH_ASSOC);


    // $data = array('query' => $sqlgetkey, 'back' => $resultgetkey);
    $response = json_encode($resultgetresults, $resultgetchecklistres);
    return $response;
});

?>