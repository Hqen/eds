<?php
//GUID
require 'connection.php';
require 'return_codes.php';

if(!isset($_GET['mail'], $_GET['md_encryption_seed'], $_GET['last_GUID'], $_GET['count'])) {
    send(ERR_UNKNOWN, 0, 0);
    exit();
}
require 'dashboard_config.php';

$recordCount = $sync['max_sync_record_count'];

if ($recordCount == 0) {
    send(ERR_UNKNOWN, 0, 0);
}
$qres_query = "SELECT 'time_update' FROM 'server_transact' WHERE 'GUID' = " . "'" . $_GET['last_GUID'] ."'";
if (!($qres = $dbConnect->query($qres_query))) {
    send(ERR_UNKNOWN, 0, 0);
}

$tures = $qres->fetch_assoc();
$tu = $tures['time_update'];
$d = $dbConnect->query("SELECT * FROM 'server_transact' WHERE 'time_update' > '{$tu}'");
$data = $d->fetch_assoc();
send(RESULT_OK, $d, 10);

function send($error, $data, $record_count) {
//    $public_key ='1C1F3EC37D7D8DC43686110BEA9CBBB8';
//    $data = [];
//    $data['record_count'] = 1;
//    $data['public_key'] = $public_key;
    $res = [];
    $res['record_count'] = $record_count;
    $res['records'] = $data;
    $res['error'] = $error;
    echo json_encode($res);
    exit();
}