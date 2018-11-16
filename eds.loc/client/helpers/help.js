import {application} from "../index.js";

//Обновляет таблицу по её имени и добавляет запись в client_transact
//names - строка состоящая из данных, которые пойдут в таблицу
//через ":" идут данные, которые заменяли в insert через as
// т.к. выборка идёт из вех даных select'a "псевдоним:ключ
//names: 'new_GUID:GUID, is_delete, time_update, title, town, address'
export  function update_table(tab_name, names, data) {
    let normal_data = {};
    let n = names.replace(/\s+/g,'').split(',').map(x=>x.split(':'));
    //принимаем массив ключей объекта,
    // если второй элемент существует,
    // то ключ нового объекта будет этим элементом
    for (let i of n) {
        normal_data = {
            ...normal_data,
            [i[1] !== undefined ? i[1] : i[0]]: data[i[0]]
        }
    }
    if (normal_data.GUID === undefined) {
        normal_data.GUID = new_GUID();
        alasql(`INSERT INTO ${tab_name} VALUES ${normal_data}`);
        let vals = {
            query_type:"replace",
            record: normal_data
        };
        alasql(`INSERT INTO client_transact VALUES ${vals}`);
    }
    else {
        let guid = "";
        let str = "";
        for (let i in normal_data) {
            if (i === "GUID")
                guid = `${i}=${normal_data[i]}`;
            else
                str += `${i}=${normal_data[i]},`;
        }
        if (str === undefined) {
            alert('Нет данных! Но скорее всего вы не увидите это сообщение');
            return;
        }
        str = str.slice(0, str.length - 1);
        alasql(`UPDATE ${tab_name} set ${str} WHERE ${guid}`);
        let vals = {
            query_type:"update",
            record: normal_data
        };
        alasql(`INSERT INTO client_transact VALUES ${vals}`);
    }
}

export async function get_AJAX_JSON(type, destination, req, callback) {
    let request = new XMLHttpRequest();
    request.open(type, destination + "?" + req);
    request.send();
    //return reqReadyStateChange;
    await asd();
    return reqReadyStateChange();
    let f = callback || function (data) {};
    async function asd() {
        while (request.readyState < 4) {
            console.log(request.readyState);
        }
    }
    async function reqReadyStateChange() {
        if((request.readyState === 4) && (request.status === 200)) {
            console.log(request.responseText);
            let prom = request.responseText;
            let resp = JSON.parse(prom);
            console.log(resp);
            if (resp === "") {
                //TODO обработка ошибки
                console.log("Ошибка в запросе");
                //er.add();
            } else {
                return resp;
            }
        }
    }
}

// export function get_AJAX_JSON(type, destination, req, callback) {
//     let request = new XMLHttpRequest();
//     request.open(type, destination + "?" + req);
//     request.onreadystatechange = reqReadyStateChange;
//     request.send();
//     let f = callback || function (data) {};
//     function reqReadyStateChange() {
//         if((request.readyState === 4) && (request.status === 200)) {
//             console.log(request.responseText);
//             let prom = request.responseText;
//             let resp = JSON.parse(prom);
//             console.log(resp);
//             if (resp === "") {
//                 //TODO обработка ошибки
//                 console.log("Ошибка в запросе");
//                 //er.add();
//             } else {
//                 f(resp);
//             }
//         }
//     }
// }

export const open_PTL = () => application.open('PAGE_TASK_LIST');
export const open_PCL = () => application.open('PAGE_CUSTOMER_LIST');
export const open_PEL = () => application.open('PAGE_EQUIPMENT_LIST');
export const open_main = () => application.open('PAGE_START');
export const exit = () => alert('exit');

export function new_GUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

// export function update_table(table_name, table_data) {
//     alasql(`DELETE FROM ${table_name} WHERE GUID = '${table_data.GUID}'`);
//     alasql(`INSERT INTO ${table_name} VALUES ?`, [table_data]);
// }

export function sqlquery(query_name, query_params, GUID_record, callback) {
    let GUID = new_GUID();
    // тут будет код, который проверит что все готово для вставки данных
    alasql('INSERT OR REPLACE INTO client_transact \
GUID, table_name, query_type, GUID_record VALUES ?',
        [GUID, query_name.table_name, query_name.query_type, GUID_record]);
    alasql(query_name.query, query_params, callback);
}