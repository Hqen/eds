import control from "./control.js";
import {redact_table_item} from "./redact_table_item.js";
import button from "./button.js";
import {topPanel} from "../index.js";

export class redact_table extends control{
    constructor(data) {
        super();
        this._data = data;
        this._select_prototype = data.tab.select_prototype;
        this._select_string = data.tab.select_query;
        this._insert_queries = data.tab.insert_queries;
        this._save_button = new button("Сохранить", false, ()=>this._save_button_click());
        this._cancel_button = new button("Отмена", false, ()=>this._cancel_button_click());
        this._edit_button = new button("Редактировать", true, ()=>this._edit_button_click());
        this._table_items = [];
        this._data_labels = [];
    }

    draw() {
        this.fill_table();
        this._save_button.draw();
        this._cancel_button.draw();
        this._edit_button.draw();
        this._element = this.create(
            'div',
            {style:"display:grid"},
            this.create('div', {},
                this._save_button._element,
                this._cancel_button._element,
                this._edit_button._element),
            ...this._table_items.map(ti => ti._element)
        );

        if (Object.keys(this._data.data).length < 1) {
            this._edit_button_click();
            this._cancel_button._element.onclick = () => topPanel.backElement.click();
        }
    }
    fill_table() {
        let sel = this._select();
        this.add_item(this._select_prototype, sel)
    }

    _normalize(sel) {
        let res = [];
        for (let tab_name in sel) {
            res = {
                ...res,
                [tab_name]: sel[tab_name][0]
            }
        }
        return res;
    }

    _save_button_click() {
        if (this._table_items[0] === undefined) {
            alert("Как то всё слишком странно");
            return;
        }
        let texts = {};
        for (let item in this._data_labels) {
            texts = {
                ...texts,
                [item]: this._data_labels[item]._element.value
            };
        }
        texts.GUID = this._data.data.GUID;
        for (let i of this._insert_queries) {
            i(texts);
        }
        this._enabled_buttons(false);
    }

    _edit_button_click() {
        this._enabled_buttons(true);
    }

    _cancel_button_click() {
        this._enabled_buttons(false);
        for (let item in this._data_labels)
            this._data_labels[item].field_state =  true;
    }
    _enabled_buttons(val) {
        this._save_button.enable = val;
        this._cancel_button.enable = val;
        this._edit_button.enable = !val;
        for (let item in this._data_labels)
            this._data_labels[item].field_state =  !val;
    }
    _select() {
        let sel = {};
        if (this._data === undefined)
            return sel;
        // for (let tab_name in this._select_prototype)
            //let values = Object.keys(this._select_prototype[tab_name]);
            sel = alasql(this._select_string)[0];
        return sel;
    }

    add_item(prototype, table_item_data) {
        let ti = new redact_table_item(prototype, table_item_data);
        ti.draw();
        // ti.element.onclick = () => this._click({GUID: ti.GUID});
        this._table_items.push(ti);
        this._data_labels = ti.data_elems;
        if (this._element !== undefined)
            this._element.appendChild(ti._element);
    }
}