import {application} from "../index.js";
import label from "../controls/label.js";
import button from "../controls/button.js";
import data_memo from "../controls/data_memo.js";
import {data_table} from "../controls/data_table.js";

// PAGE_CUSTOMER_LIST();
export function PAGE_CUSTOMER_LIST() {
    let page = {
        page_name: "PAGE_CUSTOMER_LIST",
        caption: "Список объектов",
        back_button: true,
        search: ["tab_customer.title", "tab_customer.address", "tab_customer.town"]
    };

    application.registryPage(page, init);
    function init(page, data) {
        let controls = {
            input: new data_memo(
               "Список всех объектов. Нажмите на нужный, чтобы посмотреть подробности... Или добавьте новый",
               false
            ),
            dt: new data_table({
                name: "Список объектов",
                button_text: "Добавить объект",
                tab: {
                    select_query: `SELECT GUID, title, town FROM tab_customer`,
                    select_prototype: {
                        title: 'Заголовок',
                        address: 'Адрес',

                    },
                    insert_prototype:
                        {

                        }
                },
                query: {

                },
                click: (param) => application.open("PAGE_CUSTOMER_DESCRIPTION", param)
            })
        };
        page.addAll(controls);
    }
}