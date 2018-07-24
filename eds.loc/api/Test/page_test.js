import label from "../../Client/controls/label.js";
import button from "../../Client/controls/button.js";
import {application} from "../../Client/index.js";
import data_memo from "../../Client/controls/data_memo.js";


export function getPageTest() {
    let page = {
        page_name: "TEST",
        caption: "Список test объектов",
        back_button: true,
    };

    application.registryPage(page, init);
    function init() {
        return {
            data_memo1: new data_memo('asd', true, 0),
            data_memo2: new data_memo('asd2', false, 0),
            label: new label("asd", true),
        };
    }
}