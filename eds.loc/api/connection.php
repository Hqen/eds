<?php
require 'dashboard_config.php';
//$dbHost = $mysql['host']; // адрес сервера
//$db = $mysql['db']; // имя базы данных
//$dbUser = $mysql['user']; // имя пользователя
//$dbPassword = $mysql['pass'];
//function connect()
$dbHost = '127.0.0.1'; // адрес сервера
$db = 'eds'; // имя базы данных
$dbUser = 'edsadmin'; // имя пользователя
$dbPassword = 'asd'; // пароль

$dbConnect = new mysqli($dbHost, $dbUser, $dbPassword, $db);


//require 'Libs/rb/rb-mysql.php';
//R::setup( 'mysql:host=127.0.0.1;dbname=eds',
//    'edsadmin', 'asd' );