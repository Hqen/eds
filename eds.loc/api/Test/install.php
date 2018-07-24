<?php
include 'connection.php';
$secret_key = 'keeey';

$sql_query_create = "
CREATE TABLE `server_transact` (`ID` int NOT NULL AUTO_INCREMENT, `GUID` char(36) NOT NULL, `time_update` DATETIME NOT NULL, `query_type` char(25) NOT NULL, `GUID_record` char(36) NOT NULL, `GUID_user` char(36) NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_customer` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `title` char NOT NULL, `town` char(50) NOT NULL, `address` char NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_contract` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `GUID_customer` char(36) NOT NULL, `num` char NOT NULL, `date_begin` DATE NOT NULL, `date_end` DATE NOT NULL, `description` TEXT NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_equipment` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `GUID_category` char(36) NOT NULL, `GUID_title` char(36) NOT NULL, `model` char NOT NULL, `service_time` FLOAT NOT NULL, `ID_frequency` int NOT NULL, `GUID_manufacturer` char(36) NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_equipment_category` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `sort_id` int NOT NULL, `title` char(50) NOT NULL, `ID_division` char(20) NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_equipment_node` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `GUID_group` char(36) NOT NULL, `title` char NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_equipment_node_group` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `title` char NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_equipment_node_join` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `GUID_equipment` char(36) NOT NULL, `GUID_node` char(36) NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_service_job` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `GUID_equipment_node` char(36) NOT NULL, `ID_frequency` int NOT NULL, `service_time` FLOAT NOT NULL, `service_job` TEXT NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_user` (`GUID` char(36) NOT NULL, `ID_division` char(20) NOT NULL, `private_key` char(255) NOT NULL, `uname` char(50) NOT NULL, `mail` char(50) NOT NULL, `level` int NOT NULL, `is_enable` int NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_division` (`ID` char(20) NOT NULL, `title` char NOT NULL, PRIMARY KEY (`ID`));
CREATE TABLE `tab_contract_division` (`ID_division` char(20) NOT NULL, `GUID_contract` char(36) NOT NULL);
CREATE TABLE `tab_equipment_title` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `title` char NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_customer_equipment` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `GUID_customer` char(36) NOT NULL, `GUID_equipment` char(36) NOT NULL, `serial` char NOT NULL, `invent` char NOT NULL, `date_create` char(20) NOT NULL, `date_input` char(20) NOT NULL, `destination` char NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_contract_equipment` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `GUID_customer_equipment` char(36) NOT NULL, `GUID_contract` char(36) NOT NULL, `ID_frequency` int NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_service_frequency` (`ID` int NOT NULL, `frequency` int NOT NULL, `title` char(20) NOT NULL, PRIMARY KEY (`ID`));
CREATE TABLE `tab_manufacturer` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `title` char(20) NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_encryption` (`encryption_seed` char NOT NULL, `GUID_user` char(36) NOT NULL, `validity` DATETIME NOT NULL, PRIMARY KEY (`encryption_seed`));
CREATE TABLE `tab_task` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `task_type` char(10) NOT NULL, `task_state` char(10) NOT NULL, `GUID_customer` char(36) NOT NULL, `GUID_contract` char(36) NOT NULL, `date_create` DATETIME NOT NULL, `date_begin` DATETIME NOT NULL, `date_deadline` DATETIME NOT NULL, `time_duration` FLOAT NOT NULL, `description` TEXT NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_task_type` (`ID` char(10) NOT NULL UNIQUE, `title` char NOT NULL);
CREATE TABLE `tab_task_equipment` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `GUID_customer_equipment` char(36) NOT NULL, `GUID_task` char(36) NOT NULL, `description` TEXT NOT NULL, `is_finish` bool NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_additional_job` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `GUID_task_equipment` char(36) NOT NULL, `caption` TEXT NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_additional_job_act` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `GUID_additional_job` char(36) NOT NULL, `GUID_employee` char(36) NOT NULL, `time_begin` DATETIME NOT NULL, `time_duration` FLOAT NOT NULL, `is_finish` bool NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_service_job_act` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `GUID_service_job` char(36) NOT NULL, `GUID_employee` char(36) NOT NULL, `GUID_task_equipment` char(36) NOT NULL, `time_begin` DATETIME NOT NULL, `time_duration` FLOAT NOT NULL, `is_finish` bool NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_equipment_failure_target` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `time_insert` DATETIME NOT NULL, `GUID_task_equipment` char(36) NOT NULL, `GUID_employee` char(36) NOT NULL, `description` TEXT NOT NULL, `is_cheked` bool NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_equipment_failure_sign` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `GUID_employee` char(36) NOT NULL, `GUID_equipment_node` char(36) NOT NULL, `GUID_task_equipment` char(36) NOT NULL, `description` TEXT NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_equipment_failure_target_comment` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `GUID_employee` char(36) NOT NULL, `GUID_target` char(36) NOT NULL, `description` TEXT NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_task_employee` (`is_delete` int NOT NULL, `time_update` DATETIME NOT NULL, `GUID` char(36) NOT NULL, `GUID_user` char(36) NOT NULL, `GUID_task` char(36) NOT NULL, PRIMARY KEY (`GUID`));
CREATE TABLE `tab_task_state` (`ID` char(10) NOT NULL, `title` char NOT NULL)
";

$sql_table_name_array = array('server_transact', 'tab_customer', 'tab_contract', 'tab_equipment', 'tab_equipment_category', 'tab_equipment_node', 'tab_equipment_node_group', 'tab_equipment_node_join', 'tab_service_job', 'tab_user', 'tab_division', 'tab_contract_division', 'tab_equipment_title', 'tab_customer_equipment', 'tab_contract_equipment', 'tab_service_frequency', 'tab_manufacturer', 'tab_client', 'tab_encryption', 'tab_task', 'tab_task_type', 'tab_task_equipment', 'tab_additional_job', 'tab_additional_job_act', 'tab_service_job_act', 'tab_equipment_failure_target', 'tab_equipment_failure_sign', 'tab_equipment_failure_target_comment', 'tab_task_employee', 'tab_task_state');


function sql_drop_table($name_array, $sql_connect, &$log) {
    foreach($name_array as $value) {
        if ($sql_connect->query("drop table if exists ".$value) === TRUE) {
            $log = $log. "table ".$value." drop successfully<br>\n";
        } else {
            $log = $log. "error drop table: ".$sql_connect->error."<br>\n";
        }
    }
}

function sql_create_table($query_list, $sql_connect, &$log) {
    $query_array = explode(';', $query_list);
    foreach($query_array as $value) {
        if ($sql_connect->query($value) === TRUE) {
            $log = $log. " table create successfully<br>\n";
        } else {
            $log = $log. " error create table: ".$sql_connect->error."<br>\n";
        }
    }
}


$log_message = '';

if(isset($_POST['secret_key'])) {
    if($_POST['secret_key'] === $secret_key) {
        if(isset($_GET['create'])) {
            sql_create_table($sql_query_create, $dbConnect, $log_message);
        } else if(isset($_GET['drop'])) {
            sql_drop_table($sql_table_name_array, $dbConnect, $log_message);
        }
    } else {
        $log_message='неверное кодовое слово';
    }
}

?>
<HTML>
<HEAD>
    <meta charset="utf-8">
    <title>Install</title>
    <style>
        body, html {
            height: 100%;
            font-family: Roboto;
        }
        .container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50%;
        }
        input, button {
            font-family: Roboto;
            font-size: 14px;
            padding: 2px;
        }
    </style>
</HEAD>
<BODY>
<div class="container">
    <form action="install.php" method="post">
        <table border=0 cellpadding="2">
            <tr>
                <td style="width:200px"><p>имя БД</p></td>
                <td><input type="text" readonly value="<?php echo $db ?>" style="width:200px"></td>
            </tr>
            <tr>
                <td><p>пользователь БД</p></td>
                <td><input type="text" readonly value="<?php echo $dbUser ?>" style="width:200px"></td>
            </tr>
            <tr>
                <td><p>хост</p></td>
                <td><input type="text" readonly value="<?php echo $dbHost ?>" style="width:200px"></td>
            </tr>
            <tr>
                <td><p>кодовое слово</p></td>
                <td><input required type="text" name="secret_key" style="width:200px"></td>
            </tr>
            <tr>
                <td></td>
                <td><button formaction="?create" type="submit" style="width:200px">установить БД</button></td>
            </tr>
            <tr>
                <td></td>
                <td><button formaction="?drop" type="submit" style="width:200px">удалить БД</button></td>
            </tr>
        </table>
    </form>
</div>
<footer><?php echo $log_message ?></footer>
</BODY>
</HTML>
 