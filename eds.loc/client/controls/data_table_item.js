import control from "./control.js";
import label from "./label.js";

export class data_table_item extends control{
    constructor(prototype, data) {
        super();
        this.time_update = data.time_update;
        this._data = data;
        this._prototype = prototype;
        // this.GUID = data.GUID;
        // delete this._data.GUID;
        this._elems = [];
    }
    _matching() {//сопоставление прототипа с данными
        for (let tab_name in this._prototype) {
            //for (let elem in this._prototype[tab_name]) {
                let name = this.create(
                    'label',
                    {},
                    this._prototype[tab_name]);
                // let data = this.create(
                //     'label',
                //     {},
                //     this._data[tab_name][elem]);
                let text = '';
                if (this._data !== undefined)
                    if (this._data[tab_name] !== undefined)
                        // if (this._data[tab_name][elem] !== undefined)
                            text = this._data[tab_name];
                let data = new label(text, false);
                data.draw();
                this._elems.push(
                    this.create(
                        'div',
                        {},
                        name, data._element
                ));
            //}
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