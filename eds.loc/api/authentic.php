<?php

require 'return_codes.php';

if(isset($_GET['mail'])) {
    $mail = base64_decode($_GET['mail']);
} else {
    sendData(ERR_MAIL);
}

require 'connection.php';
if ($dbConnect->connect_errno) {
    //sendData("Не удалось подключиться: " . mysqli_connect_error());
    sendData(ERR_UNKNOWN);
}
//$mail = "asd@mail.com";
//TODO tab_user
$query = $dbConnect->query("SELECT * FROM `tab_user_server` WHERE `mail` = '".$mail."'");// . $mail);

if ( mysqli_num_rows($query) == 0 ) {
    sendData(ERR_MAIL);
}

$user = $query->fetch_assoc();
//print_r($user);
//exit();

if ($user == '') {
    sendData(ERR_MAIL);
}
$private_key = $user['private_key'];//"D64C691A08364D51A7786D89E2E21605";
$encryption_seed = generateEncryptionSeed();
$public_key = getPublicKey($private_key, $encryption_seed);//$tab['encryption_seed']);
$user_level = $user['level'];
$user_GUID = $user['GUID'];
$values = "('.$encryption_seed.','.$user_GUID.','02.09.18 11:52:23' )";
$sql = "INSERT INTO `tab_encryption` ( `encryption_seed`,`GUID_user`,`validity` ) VALUES ('$encryption_seed','$user_GUID','02.09.18 11:52:23' )";//.$values;
$update = $dbConnect->query($sql);
sendData(RESULT_OK, $public_key, $user_level);


//$user = $user->export();
//    $tab = R::xdispense('tab_encryption');
//    $tab -> encryption_seed = generateEncryptionSeed();//\"46D3D5B9754740739F1EB48208BAA5B3\";
//    $tab -> GUID = $user['GUID'];
////    dump(($tab));
//    R::exec("INSERT INTO `tab_encryption` (  `encryption_seed`,`GUID`,`validity` ) VALUES
//			( '46D3D5B9754740739F1EB48208BAA5B3','asadasd','02.09.18 11:52:23' )");
////    $tab -> validity = date("m.d.y H:i:s");
//    R::store($tab);
//    exit();
//    $private_key = $user['private_key'];//\"D64C691A08364D51A7786D89E2E21605\";
//    $public_key = getPublicKey($private_key, '46D3D5B9754740739F1EB48208BAA5B3');//$tab['encryption_seed']);
//    $user_level = $user['level'];
//    $user_auth = "{
//        'public_key' : $public_key,
//        'user_level : $user_level,
//        'error': $errors
//    }";
//
//    echo json_encode($user_auth);
//function mail()
//{
//    $mail = base64_decode($_GET['mail']);
//    $private_key = $user['private_key'];//"D64C691A08364D51A7786D89E2E21605";
//    $public_key = getPublicKey($private_key, '46D3D5B9754740739F1EB48208BAA5B3');//$tab['encryption_seed']);
//    $user_level = $user['level'];
//    $user_auth = "{
//        'public_key' : $public_key,
//        'user_level : $user_level,
//        'error': $errors
//}";
//}

function sendData($er, $pk="", $ul=0) {
//    $user_auth = [];
//    $user_auth[0] = [];
//    $user_auth[0]["GUID"] = "95c427fc-9d52-4320-94a8-76eba092af95";
//    $user_auth[0]['value']= "рентгеновские аппараты";
//    $user_auth[1] = [];
//    $user_auth[1]["GUID"] = "161828ee-da01-4c2f-8508-1b3b363c1ccc";
//    $user_auth[1]['value']= "биохимические анализаторы";
//    $user_auth[2] = [];
//    $user_auth[2]["GUID"] = "d3276788-ce2d-4f8f-8ce5-351d38eee6ea";
//    $user_auth[2]['value']= "дезинфекторы";

//    $user_auth = [];
//    $user_auth['public_key'] = $pk;
//    $user_auth['user_level'] = $ul;
//    $user_auth['error'] = $er;
//    $user_auth = '{"public_key" : $pk,"user_level" : $ul,"error": $er}';
    //$user_auth = array("public_key" => $pk,"user_level" => $ul,"error"=> $er);
    //echo json_encode($user_auth);
//    $user_auth = "{
//        'public_key' : $pk,
//        'user_level : $ul,
//        'error': $er
//    }";



    $user_auth = [];
    $user_auth['public_key'] = '1C1F3EC37D7D8DC43686110BEA9CBBB8';
    $user_auth['user_level'] = 2;
	$user_auth['error'] = $er;
    echo json_encode($user_auth);

    //echo json_encode("{'public_key' : $pk,'user_level' : $ul,'error': $er}");
    exit();
}

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
    echo '<pre>';
    print_r($what);
    echo '</pre>';
}

//asd
//    function generateEncryptionSeed()
//    {
//        $alphabet = "abcdef";
//        $res = '';
//        for ($i = 0; $i < 32; $i++) {
//            if (($a = random_int(0, 15)) > 9) {
//                $res .= $alphabet[$a - 10];
//            } else {
//                $res .= $a;
//            }
//        }
//        return $res;
////    return '46D3D5B9754740739F1EB48208BAA5B3';
//        //TODO generateEncryptionSeed
//    }
//
//    function getPublicKey(string $pk, string $es): string
//    {
//        $alph = "abcdef";
//        $res = "";
//        $pk = strtolower($pk);
//        $es = strtolower($es);
//        for ($i = 0; $i < strlen($pk); $i++) {
//            $index = (findIndex($pk[$i]) + findIndex($es[$i]));
//            $index = $index % 16;
//            if ($index > 9) {
//                $res .= $alph[$index - 10];
//            } else {
//                $res .= $index;
//            }
//        }
//        return $res;
//    }
//
//    function findIndex($symbol)
//    {
//        $alphabet = "abcdef";
////    if (is_numeric($symbol)) {
////        $index = settype($symbol, "integer");;
////        echo $index; echo 'a<br>';
////    } else {
////        $index = strpos($alphabet, $symbol) + 10;
////        echo $index; echo 'b<br>';
////
////    }
////        return $index;
//        $cond = strpos($alphabet, $symbol);
////    echo 'условие = '.$cond; echo  'символ = '.$symbol.'<br>';
////    exit();
//        if ($cond != '') {
//            return strpos($alphabet, $symbol) + 10;
//            //echo $c; echo 'a<br>';
//        } else {
//            return $symbol + 1 - 1;
//            //echo $c; echo 'b<br>';
//        }
////
////    return $c;
//    }