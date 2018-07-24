<?php

define('RESULT_OK',0);
define('ERR_SEED',1);
define('ERR_MAIL',2);
define('ERR_QUERY_TYPE',3);
define('ERR_MIME_TYPE',4);
define('ERR_TABLE_NAME',5);
define('ERR_GUID_NOT_FOUND',6);
define('ERR_USER_RIGHTS',7);
define('ERR_REQUEST_OVERFLOW',98);
define('ERR_UNKNOWN',99);
//$RESULT_OK = 0; //операция прошла успешно
//$ERR_SEED = 1; //неверный encryption_seed
//$ERR_MAIL = 2; //неверный mail
//$ERR_QUERY_TYPE = 3; //неверный тип запроса
//$ERR_MIME_TYPE = 4; //неверный MIME тип
//$ERR_TABLE_NAME = 5; //неверное имя таблицы
//$ERR_GUID_NOT_FOUND = 6; //запись с запрошенным GUID не найдена
//$ERR_USER_RIGHTS = 7; //недостаточно прав у пользователя
//$ERR_REQUEST_OVERFLOW = 98; //сервер не успевает ответить из-за большой загрузки. Клиент должен увеличить в два раза интервал между запросами, на ближайшие 10 минут
//$ERR_UNKNOWN = 99; //неизвестная ошибка