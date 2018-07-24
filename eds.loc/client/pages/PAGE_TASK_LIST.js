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
    function init(page) {
        let controls = {
            input: new data_memo(
                "Выберите задачу из списка ниже или создайте новую. " +
                "Для быстрого поиска введите часть слова в строку поиска",
                false
            ),
            checkbox1: new checkbox(true, false, "Только просроченные"),
            checkbox2: new checkbox(true, true, "Только мои задачи"),
            checkbox3: new checkbox(true, false, "Только на сегодня"),
        };
        page.addAll(controls);
        let pr = ["название учреждения", "город", "адрес"];
        let table_name = "tab_customer";
        let query = "SELECT GUID, title, town FROM " + table_name;
        let dt = new data_table(query, table_name, pr, "PAGE_CUSTOMER_DESCRIPTION");
        page.addAll({dt});
    }
}