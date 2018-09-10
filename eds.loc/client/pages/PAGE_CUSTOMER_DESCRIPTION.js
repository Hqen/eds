import {application} from "../index.js";
import {data_table} from "../controls/data_table.js";
import data_memo from "../controls/data_memo.js";
import label from "../controls/label.js";
import {redact_table} from "../controls/redact_table.js";
import button from "../controls/button.js";

export function PAGE_CUSTOMER_DESCRIPTION() {
    let page = {
        page_name: "PAGE_CUSTOMER_DESCRIPTION",
        caption: "Описание заказчика",
        back_button: true,
        search: false,
    };

    application.registryPage(page, init);
    function init(page, data) {
        let controls = {
            rt: new redact_table(),
            button: new button("Список оборудования", true,
                ()=> application.open("PAGE_CUSTOMER_EQUIPMENT", data)),
            button2: new button("Список задач", true,
                ()=> application.open("PAGE_TASK_LIST", data)),
            dt: new data_table({
                name: "Действующие контракты",
                button: "Добавить",
                query: {
                    select: [`SELECT * FROM tab_contract, tab_customer WHERE tab_contract.GUID_customer = ${data.GUID}`]
                },
                click: (param) => application.open("PAGE_CUSTOMER_CONTRACT_EQUIPMENT", param)
            })
        };
        page.addAll(controls);
    }
}