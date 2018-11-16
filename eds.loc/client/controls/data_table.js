import control from "./control.js";
import {data_table_item} from "./data_table_item.js";
import label from "./label.js";
import button from "./button.js";

export class data_table extends control {
    constructor(data) {
        super();
        this._select_string = data.tab.select_query;
        this._name = data.name;
        this._button_text = data.button_text;
        this._max_count = 50;//TODO Выборка из system
        this._select_prototype = data.tab.select_prototype;
        this._click = data.click;
        this._table_items = [];
    }
    draw() {
        this.fill_table();
        let name = new label(this._name, true);//this.create('span', {}, this._name);
        let but = new button(this._button_text, true, () => this._click({}));
        name.draw();
        but.draw();
        let container = this.create('div', {}, name._element, but._element);
        this._element = this.create(
            'div',
            {style:"display:grid", className:"data_table"},
            container,
            ...this._table_items
        );
    }

    fill_table() {
        let sel = this._select();
        for (let i = 0; i < sel.length; i++) {
            this.add_item(this._select_prototype, sel[i])
        }
    }

    _normalize(arr) {
        let res = [];
        for (let tab_name in arr) {
            for (let i = 0; i < arr[tab_name].length; i++) {
                // res[i] = {};
                // //res.push(tab_name);
                // res[i][tab_name] = arr[tab_name][i];
                res[i] = {
                    ...res[i],
                    [tab_name]: arr[tab_name][i]
                }
            }
        }
        return res;
    }

    _select() {
        return alasql(this._select_string);
    }

    // _select() {
    //     let sel = {};
    //     for (let tab_name in this._select_prototype)
    //         //let values = Object.keys(this._select_prototype[tab_name]);
    //         sel[tab_name] = alasql(`SELECT * FROM ${tab_name}`);
    //     return this._normalize(sel);
    // }

    add_item(prototype, table_item_data) {
        let ti = new data_table_item(prototype, table_item_data);
        ti.draw();
        ti._element.onclick = () => this._click(ti._data);
        this._table_items.push(ti._element);
        if (this._element !== undefined)
            this._element.appendChild(ti._element);
    }
}