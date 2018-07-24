"use strict";

import ErrorLog from "./error_log.js";
import Application from "./application.js";
import top_panel from "./controls/top_panel.js";
import SyncService from "./SyncService.js";
import footer from "./controls/footer.js";
import {register_all_page} from "./pages/register_all_page.js";
import {readSystem, system, writeSystem} from "./system.js";
import {create_database} from "./database.js";
// import {getPageTest} from "./test/page_test.js";

//экспорт объектов, которые будут использоваться вне этого скрипта
export let error_log = new ErrorLog();
export let application = new Application();

alasql('CREATE localStorage DATABASE IF NOT EXISTS lsdb');
alasql('ATTACH localStorage DATABASE lsdb');
alasql('USE lsdb');
//export let alasql = alasql.databases['alasql'];
//alasql = alasql;
//window.db = alasql;

//Регистрация всех страничек
register_all_page();
create_database();
export let topPanel = new top_panel();

let foot = new footer();
open_page_start();
//open_page_start();
//TODO Проверка на заполненность систEма
//TODO переделать открытие страничек в функции и разнести их в файлы
export function open_page_start() {
    //sync_service.run();
    //alasql('CREATE LOCALSTORAGE DATABASE lsbase');
    let m = document.querySelector('main');
    // m.style.display = "grid";
        add_header_and_footer(m);
    application.open('PAGE_START');
    // time();
    // function time() {
    //     sync_service.sync_server_transact();
    //     setTimeout(time, 180000);
    // }
}

function check_lockalstorage() {

}

export function open_page_login() {
    readSystem();
    if (system.password=== undefined || system.password === "" && 
        system.mail === undefined || system.mail === "") {
        application.open('PAGE_LOGIN');
        //open();
    }
}
function open_page_prk()
{
    if (localStorage.system === undefined) {
        application.open('PAGE_SETTING_PRIVATE_KEY');
        writeSystem();
    }
}

function add_header_and_footer(main) {
    topPanel.draw();
    document.body.insertBefore(topPanel.element, main);
    foot.draw();
    document.body.appendChild(foot.element);

}

// import ErrorLog from "./error_log.js";
// import Application from "./application.js";
// export let error_log = new ErrorLog();
// export let application = new Application();
// import top_panel from "./controls/top_panel.js";
// import  {page} from "./pages/PAGE_START.js";
// // import {PAGE_START} from "./pages/PAGE_START.js";
// // // import {PAGE_CUSTOMER_LIST} from "./pages/PAGE_CUSTOMER_LIST.js";
// // // import {getPageTest} from "./test/page_test.js";
// //
// // //экспорт объектов, которые будут использоваться вне этого скрипта
// //
// //
// // PAGE_START();
// // PAGE_CUSTOMER_LIST();
// // getPageTest();
// let m = document.querySelector('main');
// export let topPanel = new top_panel();
// topPanel.draw();
// document.body.insertBefore(topPanel.element, m);
//
// // let PAGE_START = {};
// // PAGE_START.controls = {
// //     label: new label(true,"asd"),
// //
// // };
// application.open('PAGE_START');

// import ErrorLog from "./error_log.js";
// import Application from "./application.js";
// export let error_log = new ErrorLog();
// export let application = new Application();
// import top_panel from "./controls/top_panel.js";
//
// let m = document.querySelector('main');
// export let topPanel = new top_panel();
// topPanel.draw();
// document.body.insertBefore(topPanel.element, m);
