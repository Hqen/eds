import {application} from "../index.js";
import label from "../controls/label.js";
import button from "../controls/button.js";
import data_memo from "../controls/data_memo.js";
import {checkbox} from "../controls/checkbox.js";
import {data_table} from "../controls/data_table.js";

export function PAGE_TASK_LIST() {
    let page = {
        page_name: "PAGE_TASK_LIST",
        caption: "Список объектов",
        back_button: true,
    };

    application.registryPage(page, init);
    function init(page, data) {
        let controls = {
            input: new data_memo(
                "Выберите задачу из списка ниже или создайте новую. " +
                "Для быстрого поиска введите часть слова в строку поиска",
                false
            ),
            checkbox1: new checkbox(true, false, "Только просроченные"),
            checkbox2: new checkbox(true, true, "Только мои задачи"),
            checkbox3: new checkbox(true, false, "Только на сегодня"),
            dt: new data_table({
                table_name: "tab_customer",
                prototype: ["название учреждения", "город", "адрес"],
                query: ["SELECT GUID, title, town FROM " + this.table_name],
                click: "PAGE_CUSTOMER_DESCRIPTION"
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