<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

use \Psr\Http\Message\UploadedFileInterface as UploadedFile;

require 'vendor/autoload.php';
header("Content-Type: application/json");
// header('Access-Control-Allow-Origin: *');
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    //     cache for 1 day
    //     header('Access-Control-Max-Age: 86400');
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }

}

$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);


// Start SLim API
$app = new \Slim\App($c);

// neededForFileupload
$container = $app->getContainer();
$container['upload_directory'] = __DIR__ . "/../uploads";

// API CALL: test call
// TODO: Make DOC
$app->get('/testcall', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1', 'type' => '40X');
    $response = json_encode($data);
    return $response;
});


require 'routes/login.php';
require 'routes/groups.php';
require 'routes/users.php';
require 'routes/orgs.php';
require 'routes/cron.php';
require 'routes/mail.php';
require 'routes/questions.php';
require 'routes/results.php';



// run the app
$app->run();
