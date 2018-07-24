import label from "../controls/label.js";
import button from "../controls/button.js";
import {application} from "../index.js";
import {open_PCL, open_PEL, open_PTL} from "../helpers/help.js";
import {data_table} from "../controls/data_table.js";

export function PAGE_START() {
    let page = {
        page_name: "PAGE_START",
        caption: "Стартовая страница",
        back_button: false,
    };
    application.registryPage(page, init);

    function init(page) {
        let controls = {
            PAGE_CUSTOMER_LIST: new button("Список заказчиков", true, open_PCL),
            PAGE_EQUIPMENT: new button("Список оборудования", true, open_PEL),
            PAGE_TASK_LIST: new button("Мои задачи", true, open_PTL),
            label: new label("Задачи по направлениям", true),
        };
        //в lt кидаются контролы и через create добавляются
        page.addAll(controls);

        //let lt = new layout_table();
        //lt.add_item(controls.label, controls.PAGE_CUSTOMER_LIST);
        //page.addAll({lt});

        //lt.table_item_c(page._data["lt"].element, controls.label, controls.PAGE_CUSTOMER_LIST);
    }
 }


//class PAGE_START {
//     export function PAGE_START() {
// //constructor() {
//     let PAGE_START = {};
//         PAGE_START.controls = {
//         label: new label(true,"asd"),
//
//     };
//     //     PAGE_START.controls = {};
//     //     PAGE_START.controls.PAGE_CUSTOMER =
//     //         new button(true, application.open('PAGE_CUSTOMER'), "Список заказчиков");
//     //     PAGE_START.controls.PAGE_EQUIPMENT =
//     //         new button(true, application.open('PAGE_EQUIPMENT'), "Список оюорудования");
//     //     PAGE_START.controls.PAGE_TASK_LIST =
//     //         new button(true, application.open('PAGE_TASK_LIST'), "Мои задачи");
//     //     PAGE_START.controls.label = new label(true, "Задачи по направлениям");
//         PAGE_START.caption = "Start page";
//         PAGE_START.page_name = "PAGE_START";
//         application.registryPage(PAGE_START, init);
//
// //}
//
// //     init() {
// //         this.controls.PAGE_CUSTOMER =
// //             new button(true, application.open('PAGE_CUSTOMER'), "Список заказчиков");
// //         this.controls.PAGE_EQUIPMENT =
// //             new button(true, application.open('PAGE_EQUIPMENT'), "Список оюорудования");
// //         this.controls.PAGE_TASK_LIST =
// //             new button(true, application.open('PAGE_TASK_LIST'), "Мои задачи");
// //         this.controls.label = new label(true, "Задачи по направлениям");
// //
// //     }
// // }
//
// function init() {
//     PAGE_START.controls.PAGE_CUSTOMER =
//         new button(true, application.open('PAGE_CUSTOMER'), "Список заказчиков");
//     PAGE_START.controls.PAGE_EQUIPMENT =
//         new button(true, application.open('PAGE_EQUIPMENT'), "Список оюорудования");
//     PAGE_START.controls.PAGE_TASK_LIST =
//         new button(true, application.open('PAGE_TASK_LIST'), "Мои задачи");
//     PAGE_START.controls.label = new label(true, "Задачи по направлениям");
//     return PAGE_START.controls;
// }
//
//     //let page = new PAGE_START();
// }
