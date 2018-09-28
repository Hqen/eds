<?php
require 'connection.php';
require 'return_codes.php';
//TODO заменить пост на рабочий
if(!isset($_GET['table_name'], $_GET['mail'], $_GET['md_encryption_seed'], $_GET['count'], $_POST['GUID_records'])) {
    send(ERR_UNKNOWN, 0);
    exit();
}

$GUID_records = $_GET['last_GUID'];
$count = $_GET['count'];
$table_name = $_GET['table_name'];
require 'dashboard_config.php';

$recordCount = $sync['max_sync_record_count'];
if ($recordCount == 0) {
    send(ERR_UNKNOWN, 0);
}

$GUID_records = json_decode($_POST['GUID_records']);

$index = ($count < $recordCount) ? $count : $recordCount;
$res = [];
for ($i = 0; $i < $index; $i++) {
    $d = $dbConnect->query("SELECT * FROM '{$table_name}' WHERE 'GUID' = '{$GUID_records[$i]['GUID']}'");
    $data = $d->fetch_assoc();
    $res[$i] = $data;
}

send(RESULT_OK,$res);

function send($error, $data, $public_key, $defect_GUID) {
    $res = [];
    $res['records'] = $data;
    $res['record_count'] = count($data);
    $res['defect_GUID'] = $defect_GUID;
    $res['public_key'] = $public_key;
    $res['error'] = $error;
    echo json_encode($res);
    exit();
}
