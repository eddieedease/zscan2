<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
// API
// API CALL: Make an groupkey
// TODO: Make DOC

// TODO: If an auser that is not an admin  makes a group, we must automagically include this in his/her groups (auserstogroup table)
// Get a lesson item here (for the object tree)
$app->get('/makegroup/{groupname}/{aid}', function (Request $request, Response $response) {
    $groupname = $request->getAttribute('groupname');
    $aid = $request->getAttribute('aid');
    $aid = (int)$aid;
    // aid can be admin or a number, if it is number --> assign with new query
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    // Check if the groupname is already taken
    $sql_u = "SELECT * FROM groups WHERE name = '$groupname'";
    $stmt_u = $dbh->prepare($sql_u);
    $stmt_u->execute();
    $result_u = $stmt_u->fetchAll(PDO::FETCH_ASSOC);

    if (count($result_u) > 0) {
        $name_error = "Sorry... group already taken";
        //     NOTE colleting everything for converting
        //     NOTE colleting everything for converting
        $data = array('query' => $sqlinsertgroup, 'status' => "error", 'reason' => 'groupname');
        $response = json_encode($data);
        //     convert it all to jSON TODO change result
        return $response;
        $response = json_encode($data);
        //     convert it all to jSON TODO change result
        return $response;
    } else {
        //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
        //     a query get all the correct records from the gemeenten table
        $sqlinsertgroup = "INSERT INTO groups (name, status) VALUES ('$groupname', 1)";
        $stmtinsertgroup = $dbh->prepare($sqlinsertgroup);
        $stmtinsertgroup->execute();
        $resultinsertgroup = $stmtinsertgroup->fetchAll(PDO::FETCH_ASSOC);
        $lastIdInsert = $dbh->lastInsertId();
        //     NOTE colleting everything for converting
        $data = array('query' => $sqlinsertgroup, 'status' => "success");
        $response = json_encode($data);

        // if user is not admin, add the group to them
        if ($aid != 0) {
            $sqlinsertadmin = "INSERT INTO admin_to_groups (userid, groupid) VALUES ('$aid', $lastIdInsert)";
            $stmtinsertadmin = $dbh->prepare($sqlinsertadmin);
            $stmtinsertadmin->execute();
            $resultinsertadmin = $stmtinsertadmin->fetchAll(PDO::FETCH_ASSOC);

        }

        //     convert it all to jSON TODO change result
        return $response;
    }

}
);

// API: Edit Group
$app->get('/editgroup/{groupid}/{groupname}', function (Request $request, Response $response) {
    $groupid = $request->getAttribute('groupid');
    $groupname = $request->getAttribute('groupname');
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    $sqleditgroup = "UPDATE groups SET name = '$groupname' WHERE id = '$groupid'";
    $stmteditgroup = $dbh->prepare($sqleditgroup);
    $stmteditgroup->execute();
    $resulteditgroup = $stmteditgroup->fetchAll(PDO::FETCH_ASSOC);

    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resuleditgroup);

    //     convert it all to jSON TODO change result
    $response = json_encode($resulteditgroup);
    return $response;
}
);

// API CALLS GROUP MANAGEMENT
// API CALL
// GET GROUPS

// TODO: check in ausers table what type user it is, if it is a superadmin, give back all groups
// if not, make new query to get the users to groups
$app->get('/getgroups/{userid}', function (Request $request, Response $response) {
    $userid = $request->getAttribute('userid');
    $userid = (int)$userid;
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    // Check if the groupname is already taken
    $sql_u = "SELECT * FROM ausers WHERE id = '$userid'";
    $stmt_u = $dbh->prepare($sql_u);
    $stmt_u->execute();
    $result_u = $stmt_u->fetchAll(PDO::FETCH_ASSOC);
    $aitype = $result_u[0]['type'];
    $aitype = (int)$aitype;
    

    if ($aitype == 2) {
        // is admin type, give it back all
        $sqlgetgroups = "SELECT * FROM groups";
    } elseif ($aitype == 1) {
        // Normal Admin type, fetch selected groups

        $sql_g = "SELECT * FROM admin_to_groups WHERE userid = '$userid'";
        $stmt_g = $dbh->prepare($sql_g);
        $stmt_g->execute();
        $result_g = $stmt_g->fetchAll(PDO::FETCH_ASSOC);

        // 1 = own 2 = inervo
        $prefix1 = $idstring1 = '';
        // TODO, WE MUST CREATE 2 DIFFERENT ARRAYS
        foreach ($result_g as $group) {
                $idstring1 .= $prefix1 . '' . $group['groupid'] . '';
                $prefix1 = ', ';
        }

        $sqlgetgroups = "SELECT * FROM groups WHERE id IN ($idstring1)";
    }
    // SQL QUERY FOR getting group id with key

    $stmtgetgroups = $dbh->prepare($sqlgetgroups);
    $stmtgetgroups->execute();
    $resultgetgroups = $stmtgetgroups->fetchAll(PDO::FETCH_ASSOC);

    $data = array('query' => $sqlgetgroups, 'type' => $aitype, 'back' => $resultgetgroups);
    $response = json_encode($resultgetgroups);
    return $response;
});


// API: Edit Group
$app->get('/getausergroups/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $groupname = $request->getAttribute('groupname');
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    $sql_gr = "SELECT * FROM groups";
    $stmt_gr = $dbh->prepare($sql_gr);
    $stmt_gr->execute();
    $result_gr = $stmt_gr->fetchAll(PDO::FETCH_ASSOC);
    
    
    
    $sql_g = "SELECT * FROM admin_to_groups WHERE userid = '$id'";
    $stmt_g = $dbh->prepare($sql_g);
    $stmt_g->execute();
    $result_g = $stmt_g->fetchAll(PDO::FETCH_ASSOC);

    $data = array('groups' => $result_gr, 'usertogroups' => $result_g);
    $response = json_encode($data);
    return $response;
}
);


// API: Edit Group
$app->get('/getgrouplist/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $groupname = $request->getAttribute('groupname');
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sql_g = "SELECT * FROM users WHERE grouplink = '$id'";
    $stmt_g = $dbh->prepare($sql_g);
    $stmt_g->execute();
    $result_g = $stmt_g->fetchAll(PDO::FETCH_ASSOC);

    $response = json_encode($result_g);
    return $response;
}
);


// API: Test status
$app->get('/changestatus/{groupid}/{status}', function (Request $request, Response $response) {
    $groupid = $request->getAttribute('groupid');
    $status = $request->getAttribute('status');
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    $sqlupdatestatus = "UPDATE groups SET status = '$status' WHERE id = '$groupid'";
    $stmtupdatestatus = $dbh->prepare($sqlupdatestatus);
    $stmtupdatestatus->execute();
    $resultupdatestatus = $stmtupdatestatus->fetchAll(PDO::FETCH_ASSOC);

    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resulupdatestatus);

    //     convert it all to jSON TODO change result
    $response = json_encode($resultupdatestatus);
    return $response;
}
);



// TODO: Ausers from and to group
$app->get('/ausertofromgroup/{case}/{groupid}/{userid}', function (Request $request, Response $response) {
    $groupid = $request->getAttribute('groupid');
    $groupid = (int) $groupid;
    $userid = $request->getAttribute('userid');
    $userid = (int) $userid;
    $casee = $request->getAttribute('case');

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    switch ($casee) {
        case "add":
            $sqlinsertadmin = "INSERT INTO admin_to_groups (userid, groupid) VALUES ('$userid', '$groupid')";
            $stmtinsertadmin = $dbh->prepare($sqlinsertadmin);
            $stmtinsertadmin->execute();
            $resultinsertadmin = $stmtinsertadmin->fetchAll(PDO::FETCH_ASSOC);
            $debug = array('status' => 'success', 'action' => 'added');
            break;
        case "rem":
            $sqldeleteadmin = "DELETE FROM admin_to_groups WHERE userid = $userid AND groupid = $groupid";
            $stmtdeleteadmin = $dbh->prepare($sqldeleteadmin);
            $stmtdeleteadmin->execute();
            $resultdeleteadmin = $stmtdeleteadmin->fetchAll(PDO::FETCH_ASSOC);
            $debug = array('status' => 'success', 'action' => 'removed');
            break;
    }

    
    $response = json_encode($debug);
    return $response;
}
);
