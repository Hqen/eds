import control from "./control.js";
import {redact_table_item} from "./redact_table_item.js";

export class redact_table extends control{
    constructor(data) {
        super();
        this._GUID = data.GUID;
        this._prototype = data.prototype;
    }
    draw() {
        this.fill_table();
        this._element = this.create(
            'div',
            {style:"display:grid"}

        )
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

    _select() {
        let sel = {};
        if (this._GUID === undefined)
            return sel;
        for (let tab_name in this._select_prototype)
            //let values = Object.keys(this._select_prototype[tab_name]);
            sel[tab_name] = alasql(`SELECT * FROM ${tab_name} WHERE GUID = ${this._GUID}`)[0];
        return sel;
    }

    add_item(prototype, table_item_data) {
        let ti = new redact_table_item(prototype, table_item_data);
        ti.draw();
        // ti.element.onclick = () => this._click({GUID: ti.GUID});
        this._table_items.push(ti.element);
        if (this._element !== undefined)
            this._element.appendChild(ti.element);
    }
}