export function create_database() {
    alasql("CREATE TABLE IF NOT EXISTS `server_transact` (\n" +
        "  `ID` int(11) NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `table_name` char(25) NOT NULL,\n" +
        "  `query_type` char(25) NOT NULL,\n" +
        "  `GUID_record` char(36) NOT NULL,\n" +
        "  `GUID_user` char(36) NOT NULL,\n" +
        "  `ID_division` char(20) NOT NULL\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_additional_job` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `GUID_task_equipment` char(36) NOT NULL,\n" +
        "  `caption` text NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_additional_job_act` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `GUID_additional_job` char(36) NOT NULL,\n" +
        "  `GUID_employee` char(36) NOT NULL,\n" +
        "  `time_begin` datetime NOT NULL,\n" +
        "  `time_duration` float NOT NULL,\n" +
        "  `is_finish` tinyint(1) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_contract` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `GUID_customer` char(36) NOT NULL,\n" +
        "  `num` char(1) NOT NULL,\n" +
        "  `date_begin` datetime NOT NULL,\n" +
        "  `date_end` datetime NOT NULL,\n" +
        "  `description` text NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_contract_division` (\n" +
        "  `ID_division` char(20) NOT NULL,\n" +
        "  `GUID_contract` char(36) NOT NULL\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_contract_equipment` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `GUID_customer_equipment` char(36) NOT NULL,\n" +
        "  `GUID_contract` char(36) NOT NULL,\n" +
        "  `ID_frequency` int(11) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_customer` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `title` char(50) NOT NULL,\n" +
        "  `town` char(50) NOT NULL,\n" +
        "  `address` char(50) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_customer_equipment` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `GUID_customer` char(36) NOT NULL,\n" +
        "  `GUID_equipment` char(36) NOT NULL,\n" +
        "  `serial` char(50) NOT NULL,\n" +
        "  `invent` char(50) NOT NULL,\n" +
        "  `date_create` char(20) NOT NULL,\n" +
        "  `date_input` char(20) NOT NULL,\n" +
        "  `destination` char(50) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_division` (\n" +
        "  `ID` char(20) NOT NULL,\n" +
        "  `title` char(20) NOT NULL,\n" +
        "  PRIMARY KEY (`ID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_encryption` (\n" +
        "  `encryption_seed` char(32) NOT NULL,\n" +
        "  `GUID_user` char(36) NOT NULL,\n" +
        "  `validity` datetime NOT NULL,\n" +
        "  PRIMARY KEY (`encryption_seed`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_equipment` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `GUID_category` char(36) NOT NULL,\n" +
        "  `GUID_title` char(36) NOT NULL,\n" +
        "  `model` char(255) NOT NULL,\n" +
        "  `service_time` float NOT NULL,\n" +
        "  `ID_frequency` int(11) NOT NULL,\n" +
        "  `GUID_manufacturer` char(36) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_equipment_category` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `sort_id` int(11) NOT NULL,\n" +
        "  `title` char(50) NOT NULL,\n" +
        "  `ID_division` char(20) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_equipment_failure_sign` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `GUID_employee` char(36) NOT NULL,\n" +
        "  `GUID_equipment_node` char(36) NOT NULL,\n" +
        "  `GUID_task_equipment` char(36) NOT NULL,\n" +
        "  `description` text NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_equipment_failure_target` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `time_insert` datetime NOT NULL,\n" +
        "  `GUID_task_equipment` char(36) NOT NULL,\n" +
        "  `GUID_employee` char(36) NOT NULL,\n" +
        "  `description` text NOT NULL,\n" +
        "  `is_cheked` tinyint(1) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_equipment_failure_target_comment` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `GUID_employee` char(36) NOT NULL,\n" +
        "  `GUID_target` char(36) NOT NULL,\n" +
        "  `description` text NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_equipment_node` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `GUID_group` char(36) NOT NULL,\n" +
        "  `title` char(50) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_equipment_node_group` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `title` char(50) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_equipment_node_join` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `GUID_equipment` char(36) NOT NULL,\n" +
        "  `GUID_node` char(36) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_equipment_title` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `title` char(50) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_manufacturer` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `title` char(50) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_service_frequency` (\n" +
        "  `ID` int(11) NOT NULL,\n" +
        "  `frequency` int(11) NOT NULL,\n" +
        "  `title` char(50) NOT NULL,\n" +
        "  PRIMARY KEY (`ID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_service_job` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `GUID_equipment_node` char(36) NOT NULL,\n" +
        "  `ID_frequency` int(11) NOT NULL,\n" +
        "  `service_time` float NOT NULL,\n" +
        "  `service_job` text NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_service_job_act` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `GUID_service_job` char(36) NOT NULL,\n" +
        "  `GUID_employee` char(36) NOT NULL,\n" +
        "  `GUID_task_equipment` char(36) NOT NULL,\n" +
        "  `time_begin` datetime NOT NULL,\n" +
        "  `time_duration` float NOT NULL,\n" +
        "  `is_finish` tinyint(1) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_task` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `task_type` char(10) NOT NULL,\n" +
        "  `task_state` char(10) NOT NULL,\n" +
        "  `GUID_customer` char(36) NOT NULL,\n" +
        "  `GUID_contract` char(36) NOT NULL,\n" +
        "  `date_create` datetime NOT NULL,\n" +
        "  `date_begin` datetime NOT NULL,\n" +
        "  `date_deadline` datetime NOT NULL,\n" +
        "  `time_duration` float NOT NULL,\n" +
        "  `description` text NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_task_employee` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `GUID_user` char(36) NOT NULL,\n" +
        "  `GUID_task` char(36) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_task_equipment` (\n" +
        "  `is_delete` int(11) NOT NULL,\n" +
        "  `time_update` datetime NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `GUID_customer_equipment` char(36) NOT NULL,\n" +
        "  `GUID_task` char(36) NOT NULL,\n" +
        "  `description` text NOT NULL,\n" +
        "  `is_finish` tinyint(1) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_task_state` (\n" +
        "  `ID` char(10) NOT NULL,\n" +
        "  `title` char(50) NOT NULL\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_task_type` (\n" +
        "  `ID` char(10) NOT NULL,\n" +
        "  `title` char(50) NOT NULL,\n" +
        "  UNIQUE KEY `ID` (`ID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_user` (\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `ID_division` char(20) NOT NULL,\n" +
        "  `private_key` char(255) NOT NULL,\n" +
        "  `uname` char(50) NOT NULL,\n" +
        "  `mail` char(50) NOT NULL,\n" +
        "  `level` int(11) NOT NULL,\n" +
        "  `is_enable` int(11) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_user_client` (\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `ID_division` char(20) NOT NULL,\n" +
        "  `uname` char(50) NOT NULL,\n" +
        "  `mail` char(50) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n" +
        "\n" +
        "CREATE TABLE IF NOT EXISTS `tab_user_server` (\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `ID_division` char(20) NOT NULL,\n" +
        "  `private_key` char(255) NOT NULL,\n" +
        "  `uname` char(50) NOT NULL,\n" +
        "  `mail` char(50) NOT NULL,\n" +
        "  `level` int(11) NOT NULL,\n" +
        "  `is_enable` int(11) NOT NULL,\n" +
        "  PRIMARY KEY (`GUID`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n");
    alasql("CREATE TABLE IF NOT EXISTS `client_transact` (\n" +
        "  `ID` int(11) NOT NULL,\n" +
        "  `GUID` char(36) NOT NULL,\n" +
        "  `table_name` char(25) NOT NULL,\n" +
        "  `query_type` char(25) NOT NULL,\n" +
        "  `GUID_record` char(255) NOT NULL\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n")
}
