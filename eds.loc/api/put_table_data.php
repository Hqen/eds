<?php
//require 'connection.php';
//require 'return_codes.php';
//
//if(!isset($_POST['md_encryption_seed'], $_POST['mail'], $_POST['table_name'], $_POST['query_type'], $_POST['record'])) {
//    send(ERR_UNKNOWN, 0);
//    exit();
//}
//$record = json_decode($_POST['record']);
//$query_type = json_decode($_POST['query_type']);
//$table_name = $_POST['table_name'];
//
//for ($i = 0; $i < count($record); $i++) {
//    $dbConnect->query("DELETE FROM '{$table_name}' WHERE 'GUID' = '{$record[$i]['GUID']}'");
//    $dbConnect->query("INSERT INTO '{$table_name}' VALUES ({$record[$i]})");
//    $dbConnect->query("INSERT INTO 'server_transact' VALUES ({$record[$i]})");
//}
//
//function send($error, $public_key) {
//    $public_key ='1C1F3EC37D7D8DC43686110BEA9CBBB8';
//    $res = [];
//    $res['public_key'] = $public_key;
//    $res['error'] = $error;
//    echo json_encode($res);
//    exit();
//}


require 'connection.php';
require 'return_codes.php';

function sql_field_type($table_name, $field_name) {
    global $dbConnect;
    $result = $dbConnect->query("SELECT * FROM ".$table_name);
    for($i = 0; $i < $result->field_count; $i++) {
        $field = mysqli_fetch_field_direct($result, $i);
        if($field->name == $field_name) {
            return $field->type;
        }
    }
    return -1;
}

//$_GET['table_name'] = 'tab_customer';
//$json_str = '{
//	"query_type":"replace",
//	"record":{
//		"GUID":"216471f5-5a53-40f2-92f4-c1414cb7241a",
//		"title":"ГБУЗ ТО ОКБ №2",
//		"town":"Тюмень",
//		"address":"Мельникайте, 66"
//	}
//}';
$json_str = $_POST[];
$json_obj = json_decode($json_str);

$table_name = $_GET['table_name'];

$fields = [];
$values = [];
foreach($json_obj->record as $key=>$value) {
    $field_type = sql_field_type($table_name, $key);
    if($field_type == -1) {

    } else if ($field_type == MYSQLI_TYPE_LONG) {		//	http://php.net/manual/en/mysqli.constants.php
        array_push($values, $value);
    } else {
        array_push($values, "'".$value."'");
    }
    array_push($fields, "`".$key."`");
}

$fields = implode(', ', $fields);
$values = implode(', ', $values);
$query_str = "INSERT INTO `".$_GET['table_name']."` (".$fields.") VALUES (".$values.")";

if($json_obj->query_type == 'replace') {
    $dbConnect->query("DELETE FROM '".$_GET['table_name']."' WHERE 'GUID' = '".$json_obj->record->GUID."'");
    $dbConnect->query($query_str);
}

//
//function send($error, $public_key) {
//    $public_key ='1C1F3EC37D7D8DC43686110BEA9CBBB8';
//    $res = [];
//    $res['public_key'] = $public_key;
//    $res['error'] = $error;
//    echo json_encode($res);
//    exit();
//}