import {application} from "../index.js";
import {data_table} from "../controls/data_table.js";
import data_memo from "../controls/data_memo.js";
import label from "../controls/label.js";
import {redact_table} from "../controls/redact_table.js";
import button from "../controls/button.js";
import {update_table} from "../helpers/help.js";

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
            rt: new redact_table({
                data: data,
                name: "Свойства объекта",
                tab: {
                    select_query: `SELECT * FROM tab_customer WHERE GUID = ${data.GUID}`,
                    insert_queries: [
                        (data, query_type)=>update_table('tab_customer', 'GUID, is_delete, time_update, title, town, address', data, query_type),
                    ],
                    select_prototype: {
                        title: 'Заголовок',
                        town: 'Город',
                        address: 'Адрес'
                    },
                },
            }),
            button: new button("Список оборудования", true,
                ()=> application.open("PAGE_CUSTOMER_EQUIPMENT", data)),
            button2: new button("Список задач", true,
                ()=> application.open("PAGE_TASK_LIST", data)),
            dt: new data_table({
                name: "Действующие контракты",
                button_text: "Добавить контракт",
                tab: {
                    select_prototype: {

                    },
                    select_query:
                            `SELECT * FROM tab_contract, tab_customer WHERE tab_contract.GUID_customer = ${data.GUID}`
                },
                click: (param) => application.open("PAGE_CUSTOMER_CONTRACT_EQUIPMENT", param)
            })
        };
        page.addAll(controls);
    }
}