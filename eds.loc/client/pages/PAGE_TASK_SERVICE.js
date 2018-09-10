import {application} from "../index.js";
import label from "../controls/label.js";
import button from "../controls/button.js";
import data_memo from "../controls/data_memo.js";
import {checkbox} from "../controls/checkbox.js";
import {data_table} from "../controls/data_table.js";
import {layout_table} from "../controls/layout_table.js";

//TODO дать новые имнеа dtшкам
//TODO добавить запросы

export function PAGE_TASK_SERVICE() {
    let page = {
        page_name: "PAGE_TASK_SERVICE",
        caption: "Описание задачи",
        back_button: true,
        search: ["tab_equipment_title.title", "tab_equipment.model"]
    };

    application.registryPage(page, init);
    function init(page) {
        let controls = {
            label: new label("Задача на диагностику", true),
            serv: new layout_table({
                table_name: "",
                name: "Задача на обслуживание оборудования",
                prototype:
                    [   "Заказчик",
                        "Номер контракта",
                        "Контакт",
                        "Комментарии",
                        "Исполнители" ],
                query: {select: "SELECT  FROM " + this.table_name},
                click: "PAGE_TASK_DIAG_DESCRIPTION"
            }),
            dt2: new data_table({
                name: "",
                button: "Открыть акт",
                click: "PAGE_TASK_SERVICE_DESCRIPTION",
                prototype: [
                    "Аппарат наименование, модель",
                    "Заводской номер",
                    "Инвент. номер",
                    "Расположение"],
                query: {
                    select: `
                        SELECT '<b>'+tab_equipment_title.tilte+' '+tab_eqipment.model+'</b> ['+
                        tab_customer_equipment.serial+']' AS equipment,
                        tab_task_equipment.description,
                        true AS check_box_visible,
                        calc_service_job_chek(tab_task.GUID) AS check_box
                        FROM
                        tab_task, tab_task_equipment, tab_equipment, tab_equipment_title
                        WHERE
                        tab_equipment.title=tab_equipment_title.GUID AND
                        tab_equipment.GUID=tab_customer_equipment.GUID_equipment AND
                        tab_customer_equipment.GUID=tab_task_equipment.GUID_customer_equipment AND
                        tab_task_equipment.GUID_task=?`},
            }),
        };
        page.addAll(controls);
        // let data_for_dt = {
        //     table_name: "tab_customer",
        //     prototype: ["название учреждения", "город", "адрес"],
        //     select_query: ["SELECT GUID, title, town FROM " + this.table_name],
        //     page_next: "PAGE_CUSTOMER_DESCRIPTION"
        // };
        // let dt = new data_table(data_for_dt);
        // //let dt = new data_table(query, table_name, pr, "PAGE_CUSTOMER_DESCRIPTION");
        // page.addAll({dt});
    }
}