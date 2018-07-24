import {open_PCL, open_PEL, open_PTL} from "../helpers/help.js";
import button from "../controls/button.js";
import label from "../controls/label.js";
import {auth} from "../authentic.js";
import data_label from "../controls/data_label.js";
import {exit} from "../helpers/help.js";
import {application} from "../index.js";
import {auth2} from "../authentic.js";

export function PAGE_LOGIN() {
    let page = {
        page_name: "PAGE_LOGIN",
        caption: "Вход",
        back_button: false,
    };
    application.registryPage(page, init);

    function init(page) {
        let controls = {
            label: new label("Войдите", true),
            input_mail: new data_label("asd@mail.com", false),
            input_pass: new data_label("asd", true, 0),
        };

        page.addAll(controls);

        let buttons = {
            cancel: new button("Закрыть", true, exit),
            enter: new button("Ок", true, auth2, page._data.input_mail.element, page._data.input_pass.element),
        };
        page.addAll(buttons);
    }
}