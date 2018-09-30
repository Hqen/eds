"use strict";
import {get_AJAX_JSON} from "./helpers/help.js";
import {system} from "./system.js";
import requestTo from "./helpers/Requests.js";
import {topPanel} from "./index.js";

class SyncService {
    constructor(){
        this._status = "IDLE";
        this._last_run = Date();
        console.log("Last run: " + this._last_run);
    }
    async run() {
        let c = await this.update_tables();
        let sync_time = 18000;//system.
        // this._status = "RUN";
        setTimeout(this.update_tables(), sync_time);

        //get_AJAX_JSON("GET", "authentic.php", "hello");
    }
    //TODO Переименовать проверяет наличие записей каждые 180 сек || значение в системе
    //TODO Работает раз в 3 минуты
    update_tables() {
        this.sync_server_transact();
        console.log();

            //alasql(`INSERT INTO server_transact VALUES ?`, [res["records"]]);
        this.update_tables();

    }

    stop() {
        this._status = "STOP";
    }
    //Проверка на наличие новых записей
    sync_server_transact() {
        return this.transact(
        async () => {
            let GUID = alasql("SELECT TOP 1 GUID FROM server_transact ORDER BY DESC");
            let last_GUID;
            if (GUID.length === 0)
                last_GUID = 0;
            else
                last_GUID = GUID;
            let record_count_fetch = await fetch(requestTo(
                'get_sync_volume.php',
                {
                    mail: system.mail,
                    md_encryption_seed: system.encryption_seed,
                    count: 50,
                    last_GUID: last_GUID
                },
                'GET'
            ));

            let rc = await record_count_fetch.json();
            if (rc.record_count === 0) {
                topPanel.sync_prog = 100;
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
                    alasql(`INSERT INTO server_transact VALUES ?`, [data["records"]])
                }
            }
            let body = `mail=${system.mail}&md_encryption_seed=${system.encryption_seed}&last_GUID=${GUID}&count=30`;
            return fetch("/get_sync_data.php?" + body);
            }
        );
    }

    //Перенос из локального транзакта в локальные таблички
    get_server_record() {
        return this.transact(
            () => {

            }
        );
    }

    send_client_record() {
        this.transact(
            () => {
                let GUID_records = alasql("SELECT * FROM client_transact");

                return fetch(requestTo(
                    'put_table_data.php',
                    {
                        mail: system.mail,
                        md_encryption_seed: system.encryption_seed,
                        count: 50,
                        GUID_records: GUID_records
                    },
                    'POST'
                ));
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
        let q = callback();
        //let res = await q.json();
        console.log(this.status);
        this._last_run = Date();
        this._status = "IDLE";
        //return res;
    }
}

export default SyncService;