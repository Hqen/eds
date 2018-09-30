<?php
require 'connection.php';
require 'return_codes.php';

if(!isset($_GET['mail'], $_GET['md_encryption_seed'], $_GET['last_GUID'])) {
    send(ERR_UNKNOWN, 0, 0);
    exit();
}

if ($_GET['last_GUID'] == 0) {
    $record_count = $dbConnect->query("SELECT COUNT('GUID') FROM 'server_transact'");
    $firstGUID = $dbConnect->query("SELECT MIN('GUID') FROM 'server_transact' GROUP BY time_update");
    send(RESULT_OK, 0, $record_count, $firstGUID);
}

$qres = $dbConnect->query("SELECT 'time_update' FROM 'server_transact' WHERE 'GUID' = " . "'" . $_GET['last_GUID'] ."'");
$tures = $qres->fetch_assoc();
$tu = $tures['time_update'];
$record_count = $dbConnect->query("SELECT COUNT('GUID') FROM 'server_transact' WHERE 'time_update' > '{$tu}'");

send(RESULT_OK, 0, $record_count);

function send($error, $public_key, $record_count, $firstGUID = 0) {
//    $public_key ='1C1F3EC37D7D8DC43686110BEA9CBBB8';
//    $data = [];
//    $data['record_count'] = 1;
//    $data['public_key'] = $public_key;
    $res = [];
    $res['record_count'] = $record_count;
    $res['public_key'] = $public_key;
    $res['error'] = $error;
    if ($_GET['last_GUID'] == 0) {
        $res['first_GUID'] = $firstGUID;
}
    echo json_encode($res);
    exit();
}