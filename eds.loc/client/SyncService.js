"use strict";
import {get_AJAX_JSON} from "./helpers/help.js";
import {system} from "./system.js";
import requestTo from "./helpers/Requests.js";
import {topPanel} from "./index.js";
import {stringToObject} from "./helpers/help";

class SyncService {
    constructor(){
        this._status = "IDLE";
        this._last_run = Date();
        console.log("Last run: " + this._last_run);
    }
    async run() {
        let c = await this.update_tables();
        let sync_time = system.sync_delay;//system.
        // this._status = "RUN";
        setTimeout(this.update_tables(), sync_time);

        //get_AJAX_JSON("GET", "authentic.php", "hello");
    }
    //TODO Переименовать проверяет наличие записей каждые 180 сек || значение в системе
    //TODO Работает раз в 3 минуты
    //TODO Вызывается до того как загрузится страница
    update_tables() {
        this.sync_server_transact();
        let count = alasql("SELECT COUNT(GUID) FROM server_transact");
        if (count[0]["COUNT(GUID)"] !== 0)

        console.log();

            //alasql(`INSERT INTO server_transact VALUES ?`, [res["records"]]);

    }

    insert_local() {
        let record = alasql("SELECT * FROM server_transact LIMIT 1");
        let tn = record[0]["table_name"];
        let records = record
        alasql(`SELECT * FROM ${tn} VALUES ?`, []);
    }

    stop() {
        this._status = "STOP";
    }
    //Проверка на наличие новых записей
    sync_server_transact() {
        return this.transact(
        async () => {
            //TODO Синтаксическая ошибка в билиотеке нужен DESC
            let GUID = alasql("SELECT TOP 1 GUID FROM server_transact ORDER BY DESK")[0].GUID;
            let last_GUID;
            last_GUID = GUID === undefined ? 0 : GUID;
            let record_count_fetch = await fetch(requestTo(
                'get_sync_volume.php',
                {
                    mail: system.mail,
                    md_encryption_seed: system.encryption_seed,
                    count: system.sync_record_count,
                    last_GUID: last_GUID
                },
                'GET'
            ));

            let rc = await record_count_fetch.json();
            if (rc.record_count === 0) {
                // topPanel.sync_prog = 100;
                return 0;
            } else {
                let rCount = rc.record_count;
                let last_GUID = rc.first_GUID;
                while (rCount > 0) {
                    let sd = await fetch(requestTo(
                        'get_sync_data.php',
                        {
                            mail: system.mail,
                            md_encryption_seed: system.encryption_seed,
                            count: system.sync_record_count,
                            GUID_records: last_GUID
                        },
                        'GET'
                    ));
                    let data = await sd.json();
                    last_GUID = data.records[data.record_count - 1];
                    rCount -= data.records.record_count;//возможно надо убрать минус
                    alasql(`INSERT INTO server_transact VALUES ?`, [data["records"]]);
                }
            }
            // let body = `mail=${system.mail}&md_encryption_seed=${system.encryption_seed}&last_GUID=${GUID}&count=30`;
            // return fetch("/get_sync_data.php?" + body);
            }
        );
    }

    //Перенос из локального транзакта в локальные таблички
    get_server_record() {
        return this.transact(async () => {
            let count;
            while ((count = alasql(`SELECT COUNT(GUID) FROM server_transact`)[0]["COUNT(GUID)"]) > 0) {

                topPanel.sync_prog =
            }
            topPanel.sync_prog = 100;
        });
    }

    send_client_record() {
        this.transact(
            async () => {
                let data = alasql("SELECT * FROM client_transact LIMIT 1")[0];
                data.record = stringToObject(data.record);
                let res = await fetch(requestTo(
                    'put_table_data.php',
                    {
                        mail: system.mail,
                        md_encryption_seed: system.encryption_seed,
                        count: system.sync_record_count,
                        query_type: data.query_type,
                        GUID_records: data.record
                    },
                    'POST'
                ));
                let r = await res.json();
                if (r.error === 0) {
                    alasql("DELETE FROM client_transact WHERE GUID=" + data.GUID)
                }
            }
        );
    }

    get status() {
        return this._status;
    }

    //Обёртка над каждой функцией для удобства
    //Возвращает json парсеный
    async transact(callback) {
        this._status = "RUN";
        callback();
        console.log(this.status);
        this._last_run = Date();
        this._status = "IDLE";
    }
}

export default SyncService;