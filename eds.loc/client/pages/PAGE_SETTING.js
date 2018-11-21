import {application} from "../index.js";
import data_memo from "../controls/data_memo.js";
import {data_table} from "../controls/data_table.js";
import label from "../controls/label.js";
import data_label from "../controls/data_label.js";

export function PAGE_SETTING() {
    let page = {
        page_name: "PAGE_SETTING",
        caption: "Настройки",
        back_button: true,
        search: undefined
    };

    application.registryPage(page, init);
    function init(page, data) {
        let controls = {
            label1: new label("Логин (почта)"),
            login: new data_label()
        };
        page.addAll(controls);
    }
}