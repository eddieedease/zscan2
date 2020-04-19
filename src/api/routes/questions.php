<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
// API
// a API CALL TO LOG THE FORM Result

// TODO: adjust the normal ones to the new group, probably make it a post with a proper body. Parameters links will get messy
$app->post('/formsubmit/{groupid}/{userid}/{IZ1}/{IZ2}/{IZ3}/{IW1}/{IW2}/{IW3}/{IWE1}/{IWE2}/{IWE3}/{IWE4}/{IK1}/{IK2}/{IK3}/{SMOE1}/{SMOE2}/{SMOE3}/{SMOE4}/{SMOE5}/{SMOE6}', function (Request $request, Response $response) {
    // what key
    $groupid = $request->getAttribute('groupid');
    $groupid = (int)$groupid;

    $userid = $request->getAttribute('userid');
    $userid = (int)$userid;

    // get post vars
    $parsedBody = $request->getParsedBody();
    $openq = $parsedBody[openq];

    //  IZ1, IZ2, IZ3, IW1, IW2, IW3, IWE1, IWE2, IWE3, IWE4, IK1, IK2, IK3, SMOE1, SMOE2, SMOE3, SMOE4, SMOE5, SMOE6, SMOE7
    $IZ1 = $request->getAttribute('IZ1');
    $IZ2 = $request->getAttribute('IZ2');
    $IZ3 = $request->getAttribute('IZ3');

    $IW1 = $request->getAttribute('IW1');
    $IW2 = $request->getAttribute('IW2');
    $IW3 = $request->getAttribute('IW3');

    $IWE1 = $request->getAttribute('IWE1');
    $IWE2 = $request->getAttribute('IWE2');
    $IWE3 = $request->getAttribute('IWE3');
    $IWE4 = $request->getAttribute('IWE4');

    $IK1 = $request->getAttribute('IK1');
    $IK2 = $request->getAttribute('IK2');
    $IK3 = $request->getAttribute('IK3');

    $SMOE1 = $request->getAttribute('SMOE1');
    $SMOE2 = $request->getAttribute('SMOE2');
    $SMOE3 = $request->getAttribute('SMOE3');
    $SMOE4 = $request->getAttribute('SMOE4');
    $SMOE5 = $request->getAttribute('SMOE5');
    $SMOE6 = $request->getAttribute('SMOE6');

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    // SQL QUERY FOR getting group id with key
    $sqlinsertresult = "INSERT INTO results (grouplink, IZ1, IZ2, IZ3, IW1, IW2, IW3, IWE1, IWE2, IWE3, IWE4, IK1, IK2, IK3, SMOE1, SMOE2, SMOE3, SMOE4, SMOE5, SMOE6, openq) VALUES ('$groupid','$IZ1','$IZ2','$IZ3','$IW1','$IW2','$IW3','$IWE1','$IWE2','$IWE3','$IWE4','$IK1','$IK2','$IK3','$SMOE1','$SMOE2','$SMOE3','$SMOE4','$SMOE5','$SMOE6' ,'$openq')";
    $stmtinsertresult = $dbh->prepare($sqlinsertresult);
    $stmtinsertresult->execute();
    // $resultinsertresult = $stmtinsertresult->fetchAll(PDO::FETCH_ASSOC);

    $sqledituser =  "UPDATE users SET filled = '1' WHERE id = '$userid'";
    $stmtedituser = $dbh->prepare($sqledituser);
    $stmtedituser->execute();
    $resultedituser = $stmtedituser->fetchAll(PDO::FETCH_ASSOC);



    // TODO: On a succesfull submit we must set the filled property to true
    // TODO: On a succesfull submit we must set the filled property to true

    $data = array('query' => $sqledituser, 'status' => "success");
    $response = json_encode($data);
    return $response;
});


// TODO: adjust the normal ones to the new group, probably make it a post with a proper body. Parameters links will get messy
$app->get('/checklistsubmit/{groupid}/{userid}/{CW1}/{CW2}/{VB1}/{VB2}/{VB3}/{OPL1}/{OPL2}/{OPL3}/{PRO1}/{PRO2}/{PRO3}/{COM1}/{COM2}/{COM3}/{BOR1}/{BOR2}/{BOR3}/{BOR4}/{BOR5}', function (Request $request, Response $response) {
    // what key
    $groupid = $request->getAttribute('groupid');
    $groupid = (int)$groupid;

    $userid = $request->getAttribute('userid');
    $userid = (int)$userid;

    // CW1, CW2, VB1, VB2, VB3, OPL1, OPL2, OPL3, PRO1, PRO2, PRO3, COM1, COM2, COM3, BOR1, BOR2, BOR3, BOR4
    $CW1 = $request->getAttribute('CW1');
    $CW2 = $request->getAttribute('CW2');

    $VB1 = $request->getAttribute('VB1');
    $VB2 = $request->getAttribute('VB2');
    $VB3 = $request->getAttribute('VB3');

    $OPL1 = $request->getAttribute('OPL1');
    $OPL2 = $request->getAttribute('OPL2');
    $OPL3 = $request->getAttribute('OPL3');

    $PRO1 = $request->getAttribute('PRO1');
    $PRO2 = $request->getAttribute('PRO2');
    $PRO3 = $request->getAttribute('PRO3');

    $COM1 = $request->getAttribute('COM1');
    $COM2 = $request->getAttribute('COM2');
    $COM3 = $request->getAttribute('COM3');

    $BOR1 = $request->getAttribute('BOR1');
    $BOR2 = $request->getAttribute('BOR2');
    $BOR3 = $request->getAttribute('BOR3');
    $BOR4 = $request->getAttribute('BOR4');
    $BOR5 = $request->getAttribute('BOR5');

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    // SQL QUERY FOR getting group id with key
    $sqlinsertresult = "INSERT INTO checkresults (grouplink, CW1, CW2, VB1, VB2, VB3, OPL1, OPL2, OPL3, PRO1, PRO2, PRO3, COM1, COM2, COM3, BOR1, BOR2, BOR3, BOR4, BOR5) VALUES ('$groupid','$CW1','$CW2','$VB1','$VB2','$VB3','$OPL1','$OPL2','$OPL3','$PRO1','$PRO2','$PRO3','$COM1','$COM2','$COM3','$BOR1','$BOR2','$BOR3','$BOR4','$BOR5')";
    $stmtinsertresult = $dbh->prepare($sqlinsertresult);
    $stmtinsertresult->execute();
    // $resultinsertresult = $stmtinsertresult->fetchAll(PDO::FETCH_ASSOC);

    // TODO: On a succesfull submit we must set the filled property to true
    // TODO: On a succesfull submit we must set the filled property to true
    $sqledituser =  "UPDATE users SET filled = '1' WHERE id = '$userid'";
    $stmtedituser = $dbh->prepare($sqledituser);
    $stmtedituser->execute();
    $resultedituser = $stmtedituser->fetchAll(PDO::FETCH_ASSOC);

    $data = array('query' => $sqlinsertresult, 'status' => "success");
    $response = json_encode($data);
    return $response;
});

?>