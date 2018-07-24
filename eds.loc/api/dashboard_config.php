<?php
$dc = parse_ini_file("dashboard_config.ini", true);
$mysql = $dc['mysql'];
$system = $dc['system'];
$sync = $dc['sync'];