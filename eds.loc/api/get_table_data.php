<?php
require 'connection.php';
require 'return_codes.php';
//TODO заменить пост на рабочий
if(!isset($_POST['table_name'], $_POST['mail'], $_POST['md_encryption_seed'], $_POST['count'], $_POST['GUID_records'])) {
    send(ERR_UNKNOWN, 0);
    exit();
}

$GUID_records = $_POST['last_GUID'];
$count = $_POST['count'];
$table_name = $_POST['table_name'];
require 'dashboard_config.php';

$recordCount = $sync['max_sync_record_count'];
if ($recordCount == 0) {
    send(ERR_UNKNOWN, 0);
}

$GUID_records = json_decode($_POST['GUID_records']);

$index = ($count > $recordCount) ? $count : $recordCount;
$res = [];
for ($i = 0; $i < $index; $i++) {
    $d = $dbConnect->query("SELECT * FROM '{$table_name}' WHERE 'GUID' = '{$GUID_records[$i]['GUID']}'");
    $data = $d->fetch_assoc();
    $res[$i] = $data;
}

send(RESULT_OK,$res);

function send($error, $data) {
    $res = [];
    $res['records'] = $data;
    $res['error'] = $error;
    echo json_encode($res);
    exit();
}
