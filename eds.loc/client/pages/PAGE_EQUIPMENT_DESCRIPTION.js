import {application} from "../index.js";
import {data_table} from "../controls/data_table.js";
import data_memo from "../controls/data_memo.js";
import label from "../controls/label.js";
import {redact_table} from "../controls/redact_table.js";

export function PAGE_EQUIPMENT_DESCRIPTION() {
    let page = {
        page_name: "PAGE_EQUIPMENT_DESCRIPTION",
        caption: "Список объектов",
        back_button: true,
    };

    application.registryPage(page, init);
    function init(page, data) {
        let controls = {
            input: new data_memo(
                "Список всех объектов. Нажмите на нужный, чтоюы посмотреть подробности... Или добавьте новый",
                false
            ),
        };
        console.log(data);

        let pr = ["тип", "название", "время"];
        let query = `SELECT * FROM tab_equipment WHERE GUID = '${data}'`;
        //let d= ['title', 'town', 'address'];
        let rt = new redact_table(data, query, "tab_customer", pr, d);
        //let query = "";
        //let lt = new data_table("tab_customer", pr);
        // lt.add_item(undefined, c.d, c.b);
        // lt.add_item(undefined, p.a, p.c);

        page.addAll({rt});
        //page.addAll({lt});
    }
}