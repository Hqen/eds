"use strict";
import {get_AJAX_JSON} from "./helpers/help.js";
import {system} from "./system.js";
import requestTo from "./helpers/Requests.js";

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
        setTimeout(await this.update_tables(), sync_time);

        //get_AJAX_JSON("GET", "authentic.php", "hello");
    }
    //TODO Переименовать проверяет наличие записей каждые 180 сек || значение в системе
    //TODO Работает раз в 3 минуты
    //TODO синхронизация server_transact должна быть сразу
    async update_tables() {
        //Возвращает json парсеный
        let res = await this.sync_server_transact();
        console.log(res);
        if (res["record_count"] === 0)
            console.log("Нет данных для синхронизации");
        else {
            alasql(`INSERT INTO server_transact VALUES ?`, [res["records"]]);
            this.update_tables();
        }
    }

    stop() {
        this._status = "STOP";
    }
    //Проверка на наличие новых записей
    async sync_server_transact() {
        return await this.transact(
            () => {
                let GUID = alasql("SELECT TOP 1 GUID FROM server_transact ORDER BY DESC");
                let body = `mail=${system.mail}&md_encryption_seed=${system.encryption_seed}&last_GUID=${GUID}&count=30`;
                return fetch("/get_sync_data.php?" + body);
            }
        );
    }

    //Перенос из локального транзакта в локальные таблички
    async get_server_record() {
        return await this.transact(
            () => {
                let GUID_records = JSON.stringify(alasql("SELECT GUID FROM client_transact"));

                return fetch(requestTo(
                    'get_sync_data.php',
                    {
                        mail: system.mail,
                        md_encryption_seed:system.encryption_seed,
                        count: 50,
                        GUID_records: GUID_records
                    },
                    'POST'
                ));
            }
        );
    }

    send_client_record() {
        this.transact(

        );
    }

    get status() {
        return this._status;
    }

    //Обёртка над каждой функцией для удобства
    //Возвращает json парсеный
    async transact(callback) {
        this._status = "RUN";
        let q = await callback();
        let res = await q.json();
        console.log(this.status);
        this._last_run = Date();
        this._status = "IDLE";
        return res;
    }
}

export default SyncService;