import button from "../controls/button.js";
import label from "../controls/label.js";
import {application} from "../index.js";
import {auth} from "../authentic.js";
import data_label from "../controls/data_label.js";
import data_memo from "../controls/data_memo.js";
import {exit} from "../helpers/help.js";

export function PAGE_SETTING_PRIVATE_KEY() {
    let page = {
        page_name: "PAGE_SETTING_PRIVATE_KEY",
        caption: "NONE",
        back_button: false,
    };
    application.registryPage(page, init);


    function init(page) {
        let controls = {
            input_label: new label("Введите секретный ключ и почту", false),
            //TODO поля ввода?
            input_mail: new data_label("asd@mail.com", false),
            input_key: new data_memo("D64C691A08364D51A7786D89E2E21605", true, 0),

        };
        page.addAll(controls);

        let buttons = {
            cancel: new button("Закрыть", true, exit),
            enter: new button("Ок", true, auth, page._data["input_mail"].element, page._data["input_key"].element),
        };
        controls.input_mail.placeholder = "Почта (asd@mail.com)";
        controls.input_key.placeholder = "Секретный секретик введите сюда \n" +
            "(D64C691A08364D51A7786D89E2E21605)\n" +
            "P.S. скопировать через код";
        page.addAll(buttons);
    }
}