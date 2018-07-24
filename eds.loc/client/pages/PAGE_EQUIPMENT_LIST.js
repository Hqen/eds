import {application} from "../index.js";
import label from "../controls/label.js";
import button from "../controls/button.js";
import data_memo from "../controls/data_memo.js";
import {data_table} from "../controls/data_table.js";

export function PAGE_EQUIPMENT_LIST() {
    let page = {
        page_name: "PAGE_EQUIPMENT_LIST",
        caption: "Список оборудования",
        back_button: true,
    };

    application.registryPage(page, init);
    function init(page) {
        let controls = {
            input: new data_memo(
                "Список всех объектов. Нажмите на нужный, чтобы посмотреть подробности... Или добавьте новый",
                false
            ),
        };
        page.addAll(controls);

        let pr = ["тип", "название", "время"];
        let table_name = "tab_equipment";
        let query = "SELECT GUID, title, town FROM " + table_name;
        let dt = new data_table(query, table_name, pr, "PAGE_EQUIPMENT_DESCRIPTION");
        page.addAll({dt});
    }
}