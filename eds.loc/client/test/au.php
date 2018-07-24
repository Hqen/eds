<?php
/**
 * Created by PhpStorm.
 * User: КсюшА
 * Date: 03.02.2018
 * Time: 10:38
 */

/**
 * тест для authentic.php
**/
require 'connection.php';
$error = [];
if(isset($_GET['mail'])) {
    $mail = base64_decode($_GET['mail']);
} else {
    $error = ERR_MAIL;
}
$mail = 'asd@mail.com';

//if( R::testConnection() ) {
//    echo 'connection';
//}

//поиск по бд

//R::ext('xdispense', function ($table_name) {
//    return R::getRedBean()->dispense($table_name);
//});
$user = R::findOne('tab_user_server', '`mail` = ? ', [$mail]);

if ($user == '') {
    $error = ERR_UNKNOWN;
} else {
    $user = $user->export();
    //$book = R::load( 'book', $id );
    //$tab = R::load('tab_encryption');
    //exit();
//    $tab = R::xdispense('tab_encryption');
//    $tab -> encryption_seed = generateEncryptionSeed();//"46D3D5B9754740739F1EB48208BAA5B3";
//    $tab -> GUID = $user['GUID'];
////    dump(($tab));
    //R::exec("INSERT INTO `tab_encryption` VALUES( '46D3D5B9754740739F1EB48208BAA5B3','asadasd','02.09.18 11:52:23' )");
////    $tab -> validity = date("m.d.y H:i:s");
//    R::store($tab);
//    exit();

    $tab['encryption_seed'] = generateEncryptionSeed();

    $private_key = $user['private_key'];//"D64C691A08364D51A7786D89E2E21605";
    $public_key = getPublicKey($private_key, $tab['encryption_seed']);
    $user_level = $user['level'];
    $user_auth = "{
        'public_key' : $public_key,
        'user_level : $user_level,
        'error': $error
    }";

    echo json_encode($user_auth);
}

//$count = mysqli_query($host, "SELECT * FROM `tab_user_server` WHERE `mail` = `mail`");
//if ( mysqli_num_rows($count) == 0 ) {
//    echo 'Вы не зарегистрированы';
//} else {
//
//}

function generateEncryptionSeed() {
    $alphabet = "abcdef";
    $res = '';
    for ($i = 0; $i < 32; $i++) {
        if ( ( $a = random_int(0,15)) > 9 ) {
            $res .= $alphabet[$a - 10];
        } else {
            $res .= $a;
        }
    }
    return $res;
    //return '46D3D5B9754740739F1EB48208BAA5B3';
}

function getPublicKey(string $pk, string  $es): string {
    $alphabet = "abcdef";
    $res = "";
    $pk = strtolower($pk);
    $es = strtolower($es);
    for ($i = 0; $i < strlen($pk); $i++){
        $index = (findIndex($pk[$i]) + findIndex($es[$i]));
        $index = $index % 16;
        if ($index > 9) {
            $res .= $alphabet[$index - 10];
        } else {
            $res .= $index;
        }
    }
    return $res;
}

function findIndex($symbol) {
    $alphabet = "abcdef";
    if (is_numeric($symbol)) {
        settype($symbol, 'integer');
        $index = $symbol;
    } else {
        $index = strpos($alphabet, $symbol) + 10;
    }
    return $index;
}

function dump($what) {
    echo '<pre>'; print_r($what); echo '</pre>';
}
