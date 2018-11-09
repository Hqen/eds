import {application} from "../index.js";
import label from "../controls/label.js";
import button from "../controls/button.js";
import data_memo from "../controls/data_memo.js";
import {checkbox} from "../controls/checkbox.js";
import {data_table} from "../controls/data_table.js";
import {layout_table} from "../controls/layout_table.js";
import {managed_data_memo} from "../controls/managed_data_memo.js";

//TODO дать новые имнеа dtшкам
//TODO добавить запросы

export function PAGE_TASK_DIAG_DESCRIPTION() {
    let page = {
        page_name: "PAGE_TASK_DIAG_DESCRIPTION",
        caption: "Чеклист к задаче",
        back_button: true,
    };

    application.registryPage(page, init);
    function init(page) {
        let controls = {
            label: new label("Задача на диагностику", true),
            diag: new layout_table({
                name: "Задача на диагностику аппарата",
                prototype:
                   [ "Аппарат наименование, модель",
                     "Заводской номер",
                     "Дата изготовления",
                     "Дата ввода",
                     "Инвент. номер",
                     "Расположение" ],
                query: {
                    select: "SELECT GUID, title, town FROM " + this.table_name},

            }),
            dt2: new data_table2({
                name: "Признаки отказа",
                button: "Добавить признак",
                click: "PAGE_POPUP_TASK_DIAG_FAILURE",
                prototype: [
                    "Аппарат наименование, модель",
                    "Заводской номер",
                    "Инвент. номер",
                    "Расположение"],
                query: {
                    select: `
                        SELECT tab_equipment_node_group.title+' '+tab_equipment_node.title AS equipment,
                        tab_equipment_failure_sign.description
                        FROM
                        tab_equipment_node_group, tab_equipment_node, tab_equipment_failure_sign,
                        tab_task_equipment, tab_customer_equipment
                        WHERE
                        tab_equipment_failure_sign.GUID_equipment_node=tab_equipment_node.GUID AND
                            tab_equipment_node_group.GUID=tab_equipment_node.GUID_group AND
                            tab_equipment_failure_sign.GUID_task_equipment=?`},
            }),
            dt3: new data_table2({
                name: "Задания",
                button: "Добавить задание для проверки",
                prototype: ["Аппарат наименование, модель",
                    "Заводской номер",
                    "Инвент. номер",
                    "Расположение"],
                click: () => application.open("PAGE_CUSTOMER_DESCRIPTION"),
                query: {
                    select: `
                        SELECT tab_equipment_failure_target.time_insert, tab_user.uname,
                        tab_equipment_failure_target.description,
                        calc_failure_comment(tab_equipment_failure_target.GUID_target),
                        true AS check_box_visible,
                        tab_equipment_failure_target AS check_box
                        FROM
                        tab_equipment_failure_target, tab_user, tab_equipment_failure_sign
                        WHERE
                        tab_equipment_failure_target_comment.GUID_target=tab_equipment_failure_target.GUID
                        AND
                        tab_equipment_failure_target.GUID_emloyee=tab_user.GUID AND
                        tab_equipment_failure_target.GUID_task_equipment=?`},
            }),
            label2: new label("Мы нашли ещё n случаев неисправности \"name\""),//TODO добавить колличество и имя
            dm: new managed_data_memo({name: "Заполни заключение, когда выяснишь причину отказа",
                })
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