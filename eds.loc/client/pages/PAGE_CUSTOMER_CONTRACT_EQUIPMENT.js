import {application} from "../index.js";
import data_memo from "../controls/data_memo.js";
import {data_table} from "../controls/data_table.js";
import label from "../controls/label.js";

export function PAGE_CUSTOMER_CONTRACT_EQUIPMENT() {

    let page = {
        page_name: "PAGE_CUSTOMER_LIST",
        caption: "Список объектов",
        back_button: true,
    };

    application.registryPage(page, init);
    function init(page) {
        let controls = {
            input: new data_memo(
                "Список всех объектов. Нажмите на нужный, чтобы посмотреть подробности... Или добавьте новый",
                false
            ),
            dt: new data_table({
                name: "Список объектов",
                button: "Добавить объект",
                prototype: ["название учреждения", "город", "адрес"],
                query: {
                    select: ["SELECT GUID, title, town FROM tab_customer"]
                },
                click: (param) => application.open("PAGE_CUSTOMER_DESCRIPTION", param)
            })
        };
        let c = {
            d: new label("1", true),
            b: new label("1"),
        };
        let p = {
            a: new label("2", true),
            c: new label("2"),
        };
        let table_name = "tab_customer";
        // alasql(`INSERT INTO ${table_name} VALUES ?`,
        //     [{is_delete:false, time_update: Date.now(),GUID:"guid",
        //         title:"Больница", town:"Тюмень", address:"Дом и улица"}]);

        let pr = ["название учреждения", "город", "адрес"];
        let query = "SELECT GUID, title, town FROM " + table_name;
        //let dt = new data_table(query, table_name, pr, "PAGE_CUSTOMER_DESCRIPTION");
        // lt.add_item(undefined, c.d, c.b);
        // lt.add_item(undefined, p.a, p.c);
        ////
        page.addAll(controls);
        //page.addAll({dt});
    }
}