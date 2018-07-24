import {application} from "../index.js";

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

export function update_table(table_name, table_data) {
    alasql(`DELETE FROM ${table_name} WHERE GUID = '${table_data.GUID}'`);
    alasql(`INSERT INTO ${table_name} VALUES ?`, [table_data]);
}

export function sqlquery(query_name, query_params, GUID_record, callback) {
    let GUID = getGUID();
    // тут будет код, который проверит что все готово для вставки данных
    alasql('INSERT OR REPLACE INTO client_transact \
GUID, table_name, query_type, GUID_record VALUES ?',
        [GUID, query_name.table_name, query_name.query_type, GUID_record]);
    alasql(query_name.query, query_params, callback);
}