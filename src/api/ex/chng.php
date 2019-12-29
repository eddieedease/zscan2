<?php



use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

header("Content-Type: application/json");
// header('Access-Control-Allow-Origin: *');

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
	// header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header('Access-Control-Allow-Credentials: true');
	// 	header('Access-Control-Max-Age: 86400');
	// 	cache for 1 day
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
				        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
	
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
				        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}




// Start SLim API
$app = new \Slim\App;


// Basic call
$app->get('/hello/{name}', function (Request $request, Response $response) {
	$name = $request->getAttribute('name');
	$response->getBody()->write("Hello, $name");
	return $response;
}
);


// NOTE: the getAll API CALL
$app->get('/api/getall', function (Request $request, Response $response) {
	include 'db.php';
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	// 	NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
		// 	a query get all the correct records from the gemeenten table
		$sqlactions = 'SELECT * FROM actions';
	$stmtactions = $dbh->prepare($sqlactions);
	$stmtactions->execute();
	$resultactions = $stmtactions->fetchAll(PDO::FETCH_ASSOC);
	
	$sqlarcades = 'SELECT * FROM arcades';
	$stmtarcades = $dbh->prepare($sqlarcades);
	$stmtarcades->execute();
	$resultarcades= $stmtarcades->fetchAll(PDO::FETCH_ASSOC);
	
	$sqlarchive= 'SELECT * FROM archive';
	$stmtarchive = $dbh->prepare($sqlarchive);
	$stmtarchive->execute();
	$resultarchive = $stmtarchive->fetchAll(PDO::FETCH_ASSOC);
	
	$sqlhighscores = 'SELECT * FROM highscores';
	$stmthighscores = $dbh->prepare($sqlhighscores);
	$stmthighscores->execute();
	$resulthighscores = $stmthighscores->fetchAll(PDO::FETCH_ASSOC);
	
	$sqlteams = 'SELECT * FROM teams';
	$stmtteams = $dbh->prepare($sqlteams);
	$stmtteams->execute();
	$resultteams = $stmtteams->fetchAll(PDO::FETCH_ASSOC);
	
	// 	NOTE colleting everything for converting
		$result = array();
	array_push($result, $resultactions, $resultarcades, $resultarchive, $resulthighscores, $resultteams);
	
	// 	convert it all to jSON TODO change result
		$response = json_encode($result);
	return $response;
}
);





/**
* Insert New Arcade 
 * NOTE: Tested and works
 */
$app->get('/insert', function (Request $request, Response $response) {
	include 'db.php';
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	
	$paramarcadeid= $request->getQueryParam('arcadeid', $default = null);
	$paramname= $request->getQueryParam('name', $default = null);
	$paramstatus= $request->getQueryParam('status', $default = null);
	$paramactionlink= $request->getQueryParam('actionlink', $default = null);
	
	$paramlocation= $request->getQueryParam('location', $default = null);
	$paramlonglat= $request->getQueryParam('longlat', $default = null);
	$paramteamstot= $request->getQueryParam('teamstot', $default = null);
	$paramdateplaced = $request->getQueryParam('dateplaced', $default = null);
	$paramdateend = $request->getQueryParam('dateend', $default = null);
	
	$sql = "INSERT INTO arcades (arcadeid,name,status,actionlink,location,longlat,teamstot,dateplaced,dateend) VALUES ('$paramarcadeid','$paramname','$paramstatus',$paramactionlink,'$paramlocation','$paramlonglat',0,'$paramdateplaced','$paramdateend')";
	
	// 	use prepared statements, even if not strictly required is good practice
	$stmt = $dbh->prepare($sql);
	$dbh = null;
	$stmt->execute();
	
	// 	another call for making the teams database row
		$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	$sql2 = "INSERT INTO teams (linkid) VALUES ('$paramname')";
	$stmt2 = $dbh->prepare($sql2);
	$dbh = null;
	$stmt2->execute();
	
	// 	another call for making the highscores database row
		$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	$sql3 = "INSERT INTO highscores (linkid) VALUES ('$paramname')";
	$stmt3 = $dbh->prepare($sql3);
	$dbh = null;
	$stmt3->execute();
	
	$data = array('Jsonresponse' => $sql, 'success' => true);
	$response = json_encode($data);
	// 	$response = 'Added!!!';
	return $response;
	//r	eturn $newResponse;
}
);






/** 
* Edit existing Arcade 
 * NOTE: Not tested
*/
$app->get('/edit/{id}', function (Request $request, Response $response) {
	
	include 'db.php';
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	
	$id = $request->getAttribute('id');
	
	$paramarcadeid= $request->getQueryParam('arcadeid', $default = null);
	$paramname= $request->getQueryParam('name', $default = null);
	$paramstatus= $request->getQueryParam('status', $default = null);
	$paramactionlink= $request->getQueryParam('actionlink', $default = null);
	$paramlocation= $request->getQueryParam('location', $default = null);
	$paramlonglat= $request->getQueryParam('longlat', $default = null);
	$paramteamstot= $request->getQueryParam('teamstot', $default = null);
	$paramdateplaced = $request->getQueryParam('dateplaced', $default = null);
	$paramdateend = $request->getQueryParam('dateend', $default = null);
	
	// 	edit query
		$sql = "UPDATE arcades SET arcadeid = '$paramarcadeid', name = '$paramname', status = '$paramstatus', actionlink = '$paramactionlink',location ='$paramlocation',longlat ='$paramlonglat' ,teamstot ='$paramteamstot' ,dateplaced ='$paramdateplaced' ,dateend ='$paramdateend' WHERE id = '$id'";
	$stmt = $dbh->prepare($sql);
	// 	execute the query
		$dbh = null;
	$stmt->execute();
	
	$data = array('Jsonresponse' => 'Edit', 'success' => true);
	$response = json_encode($data);
	return $response;
}
);





/** 
 * NOTE: Not tested
*/
$app->get('/delete/{id}/{name}', function (Request $request, Response $response) {
	// 	set up the connection variables
		include 'db.php';
	
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	$id = $request->getAttribute('id');
	$name = $request->getAttribute('name');
	
	$sql = "DELETE FROM arcades WHERE id = '$id'";
	$stmt = $dbh->prepare($sql);
	$dbh = null;
	$stmt->execute();
	
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	$sql2 = "DELETE FROM teams WHERE linkid = '$name'";
	$stmt2 = $dbh->prepare($sql2);
	$dbh = null;
	$stmt2->execute();
	
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	$sql3 = "DELETE FROM highscores WHERE linkid = '$name'";
	$stmt3 = $dbh->prepare($sql3);
	$dbh = null;
	$stmt3 -> execute();
	
	$data = array('Jsonresponse' => 'Delete', 'success' => true);
	$response = json_encode($data);
	return $response;
}
);





/** 
* Delete  action  with ID
 * NOTE: Not tested
*/
$app->get('/deleteaction/{id}', function (Request $request, Response $response) {
	include 'db.php';
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	$id = $request->getAttribute('id');
	$name = $request->getAttribute('name');
	$sql = "DELETE FROM actions WHERE id = '$id'";
	$stmt = $dbh->prepare($sql);
	$dbh = null;
	$stmt->execute();
	
	$data = array('Jsonresponse' => 'Delete', 'success' => true);
	$response = json_encode($data);
	return $response;
}
);


$app->get('/insertaction', function (Request $request, Response $response) {
	include 'db.php';
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	
	$paramname= $request->getQueryParam('name', $default = null);
	$paraminuse= $request->getQueryParam('inuse', $default = null);
	$paramdatestart = $request->getQueryParam('datestart', $default = null);
	$paramdateend = $request->getQueryParam('dateend', $default = null);
	$sql = "INSERT INTO actions (actionname,datestart,dateend , inuse) VALUES ('$paramname','$paramdateplaced','$paramdateend','$paraminuse')";
	
	$stmt = $dbh->prepare($sql);
	$dbh = null;
	$stmt->execute();
	
	$data = array('Jsonresponse' => 'insert new team', 'success' => true);
	$response = json_encode($data);
	return $response;
}
);


$app->get('/editaction/{id}', function (Request $request, Response $response) {
	// 	set up the connection variables
		include 'db.php';
	// 	connect to the database
		$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	
	$id = $request->getAttribute('id');
	$paramname= $request->getQueryParam('name', $default = null);
	$paraminuse= $request->getQueryParam('inuse', $default = null);
	$paramdatestart = $request->getQueryParam('datestart', $default = null);
	$paramdateend = $request->getQueryParam('dateend', $default = null);
	
	$sql = "UPDATE actions SET actionname = '$paramname', datestart = '$paramdatestart',dateend ='$paramdateend', inuse ='$paraminuse' WHERE id = '$id'";
	
	$stmt = $dbh->prepare($sql);
	$dbh = null;
	$stmt->execute();
	
	$data = array('Jsonresponse' => 'Edit the action', 'success' => true);
	$response = json_encode($data);
	return $response;
}
);



$app->get('/editteamnames/{idname}', function (Request $request, Response $response) {
	// 	set up the connection variables
		include 'db.php';
	// 	connect to the database
		$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	
	$id = $request->getAttribute('idname');
	$team1 = $request->getQueryParam('team1', $default = null);
	$team2 = $request->getQueryParam('team2', $default = null);
	$team3 = $request->getQueryParam('team3', $default = null);
	$team4 = $request->getQueryParam('team4', $default = null);
	$team5 = $request->getQueryParam('team5', $default = null);
	$team6 = $request->getQueryParam('team6', $default = null);
	$team7 = $request->getQueryParam('team7', $default = null);
	$team8 = $request->getQueryParam('team8', $default = null);
	$team9 = $request->getQueryParam('team9', $default = null);
	$team10 = $request->getQueryParam('team10', $default = null);
	$team11 = $request->getQueryParam('team11', $default = null);
	$team12 = $request->getQueryParam('team12', $default = null);
	$team13 = $request->getQueryParam('team13', $default = null);
	$team14 = $request->getQueryParam('team14', $default = null);
	$team15 = $request->getQueryParam('team15', $default = null);
	
	
	$sql = "UPDATE teams SET team1name = '$team1', team2name = '$team2',team3name ='$team3', team4name ='$team4', team5name ='$team5' , team6name ='$team6' , team7name ='$team7' , team8name ='$team8' , team9name ='$team9' , team10name = '$team10' , team11name = '$team11' WHERE linkid = '$id'";
	
	$stmt = $dbh->prepare($sql);
	$dbh = null;
	$stmt->execute();
	
	$data = array('Jsonresponse' => 'Edit the action', 'success' => true);
	$response = json_encode($data);
	return $response;
}
);



/** 
* ARCADESSSS ACTION
 * Addpphone, needs only id from the arcade cabinet + the chosen team id   Teamid = [0 - 10]
 * Please note that not the actual arcadeid, but the arcadelink is given (which resembles an physical arcade)
 * So first look up the arcadeID from the arcadelink, then assign points
 * Note 2: if no team is selected the value 1 is given
*/
$app->get('/arcade/addphone/{arcadelink}/{phonescore}/{chosenteam}/{teamscore}', function (Request $request, Response $response) {
	// 	set up the connection variables
		include 'db.php';
	// 	connect to the database
		$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	
	$arcadelink = $request->getAttribute('arcadelink');
	$phonescore = $request->getAttribute('phonescore');
	$chosenteam = $request->getAttribute('chosenteam');
	$teamscore = $request->getAttribute('teamscore');
	
	//$	name = $mysqli->query("SELECT id FROM arcades WHERE actionlink = '$arcadelink'")->fetch_object()->name;
	
	$sql= "SELECT id,name,phonetot FROM `arcades` WHERE arcadeid = '$arcadelink'";
	
	$stmtaddphone = $dbh->prepare($sql);
	$dbh = null;
	$stmtaddphone->execute();
	$resultaddphone = $stmtaddphone->fetchAll(PDO::FETCH_ASSOC);

	$aid = $resultaddphone[0]['id'];
	$ain = $resultaddphone[0]['name'];
	
	// 	OK UPDATE ALL THE THINGS :)\
		$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	$sql2 = "UPDATE arcades SET phonetot = $phonescore WHERE id = '$aid'";
	$stmtaddphone2 = $dbh->prepare($sql2);
	$dbh = null;
	$stmtaddphone2->execute();
	
	// 	very nice, now just add the score to the current team
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	//
	switch ($chosenteam) {
		case '1':
		$sql3 = "UPDATE teams SET `team1tot`= $teamscore WHERE linkid = '$ain'";
		break;
		case '2':
		$sql3 = "UPDATE teams SET `team2tot`= $teamscore WHERE linkid = '$ain'";
		break;
		case '3':
		$sql3 = "UPDATE teams SET `team3tot`= $teamscore WHERE linkid = '$ain'";
		break;
		case '4':
		$sql3 = "UPDATE teams SET `team4tot`= $teamscore WHERE linkid = '$ain'";
		break;
		case '5':
		$sql3 = "UPDATE teams SET `team5tot`= $teamscore WHERE linkid = '$ain'";
		break;
		case '6':
		$sql3 = "UPDATE teams SET `team6tot`= $teamscore WHERE linkid = '$ain'";
		break;
		case '7':
		$sql3 = "UPDATE teams SET `team7tot`= $teamscore WHERE linkid = '$ain'";
		break;
		case '8':
		$sql3 = "UPDATE teams SET `team8tot`= $teamscore WHERE linkid = '$ain'";
		break;
		case '9':
		$sql3 = "UPDATE teams SET `team9tot`= $teamscore WHERE linkid = '$ain'";
		break;
		case '10':
		$sql3 = "UPDATE teams SET `team10tot`= $teamscore WHERE linkid = '$ain'";
		break;
		case '11':
		$sql3 = "UPDATE teams SET `team11tot`= $teamscore WHERE linkid = '$ain'";
		break;
		case '12':
		$sql3 = "UPDATE teams SET `team12tot`= $teamscore WHERE linkid = '$ain'";
		break;
		case '13':
		$sql3 = "UPDATE teams SET `team13tot`= $teamscore WHERE linkid = '$ain'";
		break;
		case '14':
		$sql3 = "UPDATE teams SET `team14tot`= $teamscore WHERE linkid = '$ain'";
		break;
		case '15':
		$sql3 = "UPDATE teams SET `team15tot`= $teamscore  WHERE linkid = '$ain'";
		break;
	}
	
	
	
	$stmtaddphone3 = $dbh->prepare($sql3);
	$dbh = null;
	$stmtaddphone3->execute();
	
	$tt = gettype($chosenteam);
	
	// 	ok we got the resultaddphone variable, now make the assigned
	$data = array('Jsonresponse' => $sql3 , 'type' => $tt);
	$response = json_encode($data);
	return $response;
}
);


/** 
* ARCADESSSS ACTION
 * addFailure (Not a mobile thrown in, needs only id from the arcade cabinet.
*/
$app->get('/arcade/addfailed/{arcadelink}', function (Request $request, Response $response) {
	
	// 	set up the connection variables
	include 'db.php';
	// 	connect to the database
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	$arcadelink = $request->getAttribute('arcadelink');
	$sql= "SELECT id,name,phonefailed FROM `arcades` WHERE arcadeid = '$arcadelink'";
	$stmtaddfailed = $dbh->prepare($sql);
	$dbh = null;
	$stmtaddfailed->execute();
	$resultaddfailed = $stmtaddfailed->fetchAll(PDO::FETCH_ASSOC);
	
	// 	so thats $resultaddphone[0]['name'] 
	$phonetot = $resultaddfailed [0]['phonetot'];
	$phonetot++;
	$aid = $resultaddfailed [0]['id'];
	$ain = $resultaddfailed [0]['name'];



	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	$sql2 = "UPDATE arcades SET `phonefailed`= `phonefailed` + 1 WHERE id = '$aid'";
	$stmtaddfailed2 = $dbh->prepare($sql2);
	$dbh = null;
	$stmtaddfailed2->execute();

	$data = array('Jsonresponse' => $sql2, 'type' => 'Bad Phone');
	$response = json_encode($data);
	return $response;
}
);



/** 
* ARCADESSSS ACTION
 * submitscore, need arcadeID + GameiD + scores
 * Note: There are 4 minigames build in [1] Breakout [2] Throw stuff [3] Racer [4] Platformer
*/
$app->get('/arcade/submitscore/{arcadeid}/{gameid}', function (Request $request, Response $response) {
	// set up con


	// 	set up the connection variables
	include 'db.php';
	// 	connect to the database
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	$arcadeid = $request->getAttribute('arcadeid');
	$gameid = $request->getAttribute('gameid');


	$sql= "SELECT id,name,phonefailed FROM arcades WHERE arcadeid = '$arcadeid'";
	$stmtaddfailed = $dbh->prepare($sql);
	$stmtaddfailed->execute();
	$resultaddfailed = $stmtaddfailed->fetchAll(PDO::FETCH_ASSOC);
	
	// 	so thats $resultaddphone[0]['name'] 
	$phonetot = $resultaddfailed [0]['phonetot'];
	$phonetot++;
	$aid = $resultaddfailed [0]['id'];
	$ain = $resultaddfailed [0]['name'];



	// 	connect to the database
	$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	// api vars

	
	$score1 = $request->getQueryParam('score1', $default = null);
	$name1 = $request->getQueryParam('name1', $default = null);
	
	$score2 = $request->getQueryParam('score2', $default = null);
	$name2 = $request->getQueryParam('name2', $default = null);

	$score3 = $request->getQueryParam('score3', $default = null);
	$name3 = $request->getQueryParam('name3', $default = null);

	$score4 = $request->getQueryParam('score4', $default = null);
	$name4 = $request->getQueryParam('name4', $default = null);
	
	$score5 = $request->getQueryParam('score5', $default = null);
	$name5 = $request->getQueryParam('name5', $default = null);
	
	// making an stringify thingie
	$data = array('name1' => $name1, 'score1' => $score1, 'name2' => $name2, 'score2' => $score2,'name3' => $name3, 'score3' => $score3,'name4' => $name4, 'score4' => $score4,'name5' => $name5, 'score5' => $score5);
	$highscorestring = json_encode($data);
	
	switch ($gameid) {
		case 1:
		$currentgame = 'game1';
			break;
		case 2:
		$currentgame = 'game2';
			break;
		case 3:
		$currentgame = 'game3';
			break;
		case 4:
		$currentgame = 'game4';
			break;
	}

	
	// update the highscores
	$sql2= "UPDATE highscores SET $currentgame = '$highscorestring'  WHERE linkid = '$ain'";
	
	$stmtaddscore = $dbh->prepare($sql2);
	$dbh = null;
	$stmtaddscore->execute();
	
	$data = array('Jsonresponse' => $sql, 'arraystringify' => $highscorestring);
	$response = json_encode($data);
	return $response;
}
);







// EXAMPLE for copying
$app->get('/api/{name}', function (Request $request, Response $response) {
	$name = $request->getAttribute('name');
	$data = array('Jsonresponse' => 'item1', 'type' => '40X');
	$response = json_encode($data);
	return $response;
}
);

$app->run();