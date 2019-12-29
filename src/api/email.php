<?php
header('Access-Control-Allow-Origin: *');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$naam = $request->naam;
@$email= $request->email;
@$onderwerp= $request->onderwerp;
@$bericht = $request->bericht;
$from_mail = $naam.'<'.$email.'>';
include 'db.php';
$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
$sqlmail = 'SELECT * FROM api';
$stmtmail = $dbh->prepare($sqlmail);
$stmtmail->execute();
$resultmail = $stmtmail->fetchAll(PDO::FETCH_ASSOC);
foreach ($resultmail as $row) {
            $to = $row['email'];
        };
//$to = "info@lsabewoners.nl"; // this is your Email address
$subject = "LSA Kaart - ingezonden contactformulier";
$message = $naam . " heeft het contactformulier ingevuld:" . "\n\n" . $bericht. "\n\n".$email;
$headers = 'LSA contactoformulier | ontvangen van: ' . $from_mail . "\r\n";
mail($to,$subject,$message,$headers);    //mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
echo "Mail is verstuurd, dankjewel! " . $naam . ", we nemen zo snel we kunnen contact met je op.";
$dbh = null;
// You can also use header('Location: thank_you.php'); to redirect to another page.
?>
