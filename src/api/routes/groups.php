<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

use \Psr\Http\Message\UploadedFileInterface as UploadedFile;
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


// uploading a logo of a organisation
$app->post('/uploadorglogo/{id}', function (Request $request, Response $response) {
    // below variables are for making thumbs and such
    // TODO: aren't used yet
    $groupid = $request->getAttribute('id');
    $directory = $this->get('upload_directory');
    $uploadedFiles = $request->getUploadedFiles();
    // // handle single input with single file upload
    $uploadedFile = $uploadedFiles[file];
    $nameofuploaded = $uploadedFile->getClientFilename();

    $file = $_FILES[file][tmp_name];

    list($width, $height) = getimagesize($_FILES[file][tmp_name]);

    $ext = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
    $filename = sprintf('%s.%0.8s', $basename, $ext);
    $filename = time() . $filename;
    // check if the lessonsdirectory upload folder is there, otherwise make it
    // NOTE: CONFIRM WORKS!!!
    if (!file_exists($directory . DIRECTORY_SEPARATOR . 'orglogo' . DIRECTORY_SEPARATOR . $groupid)) {
        mkdir($directory . DIRECTORY_SEPARATOR . 'orglogo' . DIRECTORY_SEPARATOR . $groupid, 0777, true);
    }

    switch ($ext) {
        case "png":
            $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . 'orglogo' . DIRECTORY_SEPARATOR . $groupid . DIRECTORY_SEPARATOR . $filename);
            break;
        case "PNG":
            $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . 'orglogo' . DIRECTORY_SEPARATOR . $groupid . DIRECTORY_SEPARATOR . $filename);
            break;
        case "gif":
            $imageResourceId = imagecreatefromgif($file);
            $targetLayer = resize_image_max($imageResourceId, 900, 900);
            imagegif($targetLayer, $directory . DIRECTORY_SEPARATOR . 'orglogo' . DIRECTORY_SEPARATOR . $groupid . DIRECTORY_SEPARATOR . $filename);
            break;
        case "GIF":
            $imageResourceId = imagecreatefromgif($file);
            $targetLayer = resize_image_max($imageResourceId, 900, 900);
            imagegif($targetLayer, $directory . DIRECTORY_SEPARATOR . 'orglogo' . DIRECTORY_SEPARATOR . $groupid . DIRECTORY_SEPARATOR . $filename);
            break;
        case "jpg":
        $file = correctImageOrientation($file);
        list($width, $height) = getimagesize($file);
        $imageResourceId = imagecreatefromjpeg($file);
            $targetLayer = resize_image_max($imageResourceId, 900, 900);
            imagejpeg($targetLayer, $directory . DIRECTORY_SEPARATOR . 'orglogo' . DIRECTORY_SEPARATOR . $groupid . DIRECTORY_SEPARATOR . $filename);
            break;
        case "JPG":
        $file = correctImageOrientation($file);
        list($width, $height) = getimagesize($file);
        $imageResourceId = imagecreatefromjpeg($file);
            $targetLayer = resize_image_max($imageResourceId, 900, 900);
            imagejpeg($targetLayer, $directory . DIRECTORY_SEPARATOR . 'orglogo' . DIRECTORY_SEPARATOR . $groupid . DIRECTORY_SEPARATOR . $filename);
            break;
        case "jpeg":
        $file = correctImageOrientation($file);
        list($width, $height) = getimagesize($file);
        $imageResourceId = imagecreatefromjpeg($file);
            $targetLayer = resize_image_max($imageResourceId, 900, 900);
            imagejpeg($targetLayer, $directory . DIRECTORY_SEPARATOR . 'orglogo' . DIRECTORY_SEPARATOR . $groupid . DIRECTORY_SEPARATOR . $filename);
            break;
        case "JPEG":
        $file = correctImageOrientation($file);
        list($width, $height) = getimagesize($file);
        $imageResourceId = imagecreatefromjpeg($file);
            $targetLayer = resize_image_max($imageResourceId, 900, 900);
            imagejpeg($targetLayer, $directory . DIRECTORY_SEPARATOR . 'orglogo' . DIRECTORY_SEPARATOR . $groupid . DIRECTORY_SEPARATOR . $filename);
            break;
        default:
            echo "Invalid Image type.";
            exit;
            break;
    }

    //if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
    //     $filename = moveUploadedFile($directory, $uploadedFile);
    // $response->write('uploaded ' . $filename . '<br/>');
    // }

    // update in the database
    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqladdfile = "UPDATE groups SET logo = '$filename' WHERE id = '$groupid'";
    $stmtaddfile = $dbh->prepare($sqladdfile);
    $stmtaddfile->execute();
    $resultaddfile = $stmtaddfile->fetchAll(PDO::FETCH_ASSOC);
    // return some thangz
    $cb = array(
        'thumbfileupload' => 'success',
        'sql' => $sqladdfile,
        'tolesson' => $groupid,
        'debug' => $file,
        'oriwidth' => $width,
    );
    /*  $debuggerrighthere = array('somethangsz' => 'asda');
    $response = json_encode($debuggerrighthere); */
    $response = json_encode($cb);
    return $response;
});




/**
 * Resizes file
 *
 * @param UploadedFile $uploaded file uploaded file to move
 */
function resize_image_max($image, $max_width, $max_height)
{
    $w = imagesx($image); //current width
    $h = imagesy($image); //current height
    if ((!$w) || (!$h)) {$GLOBALS['errors'][] = 'Image couldn\'t be resized because it wasn\'t a valid image.';return false;}
    if (($w <= $max_width) && ($h <= $max_height)) {return $image;} //no resizing needed

    //try max width first...
    $ratio = $max_width / $w;
    $new_w = $max_width;
    $new_h = $h * $ratio;

    //if that didn't work
    if ($new_h > $max_height) {
        $ratio = $max_height / $h;
        $new_h = $max_height;
        $new_w = $w * $ratio;
    }

    $new_image = imagecreatetruecolor($new_w, $new_h);
    imagecopyresampled($new_image, $image, 0, 0, 0, 0, $new_w, $new_h, $w, $h);
    return $new_image;
};

function correctImageOrientation($filename)
{
    if (function_exists('exif_read_data')) {
        $exif = exif_read_data($filename);
        if ($exif && isset($exif['Orientation'])) {
            $orientation = $exif['Orientation'];
            if ($orientation != 1) {
                $img = imagecreatefromjpeg($filename);
                $deg = 0;
                switch ($orientation) {
                    case 3:
                        $deg = 180;
                        break;
                    case 6:
                        $deg = 270;
                        break;
                    case 8:
                        $deg = 90;
                        break;
                }
                if ($deg) {
                    $img = imagerotate($img, $deg, 0);
                }
                // then rewrite the rotated image back to the disk as $filename
                imagejpeg($img, $filename, 95);
            } // if there is some rotation necessary
        } // if have the exif orientation info
    } // if function exists
    return $filename;
};





?>
