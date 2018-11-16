import control from "./control.js";
import label from "./label.js";
import data_label from "./data_label.js";

export class redact_table_item extends control{
    constructor(prototype, data) {
        super();
        // this.GUID = data.GUID;
        // this.time_update = data.time_update;
        this._data = data;
        this._prototype = prototype;
        // delete this._data.GUID;
        this._elems = [];
        this.data_elems = [];
    }

    _matching() {//сопоставление прототипа с данными
        for (let tab_name in this._prototype) {
                let name = new label(this._prototype[tab_name], true);
                let text = '';
                if (this._data !== undefined)
                    if (this._data[tab_name] !== undefined)
                        text = this._data[tab_name];
                let data = new data_label(text, false, true);
                data.placeholder = 'Введите ' + this._prototype[tab_name].toLowerCase();
                name.draw();
                data.draw();
                this.data_elems = {
                    ...this.data_elems,
                    [tab_name]:data
                };
                this._elems.push(
                    this.create(
                        'div',
                        {},
                        name._element, data._element));
        }
    }

    draw() {
        this._matching();
        this._element = this.create(
            'div',
            {style: "display:grid"},
            ...this._elems
        );
    }
}