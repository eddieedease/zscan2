<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
// API


// TODO: Delete specifc user 
$app->get('/deleteitem/{case}/{userid}', function (Request $request, Response $response) {
   $casee = $request->getAttribute('case');
   $userid = $request->getAttribute('userid');

   // setting up safe pdo connection
   include 'db.php';
   $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

   // set up correct string
   switch ($casee) {
      case "case1":
         $sqlgetdelete =  "DELETE FROM users WHERE id = $userid";
          break;
  }



   
   $stmtgetdelete = $dbh->prepare($sqlgetdelete);
   $stmtgetdelete->execute();
   $resultgetdelete = $stmtgetdelete->fetchAll(PDO::FETCH_ASSOC);

   $cb = array('status' => 'success');

   //     convert it all to jSON TODO change result
   $response = json_encode($cb);
   return $response;
}
);

?>