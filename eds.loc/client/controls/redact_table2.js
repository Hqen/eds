import control from "./control.js";
import label from "./label.js";
import data_label from "./data_label.js";
import button from "./button.js";
import {update_table} from "../helpers/help.js";

export class redact_table extends control{
    constructor(GUID, query, table_name, prototype, data) {
        super();
        this._data = data;
        this._GUID = GUID;
        this._query = query;
        this._table_name = table_name;
        this._prototype = prototype;
        this._max_count = 50;//TODO Выборка из system
        //this._table_items = [];//массив из table_item
        this._id = 0;
    }

    draw() {
        this.c = [];

        let sel = this.select();
        for (let i = 0; i < sel.length; i++) {
            let res = ac(this._prototype, sel[i], undefined, this.create);
            this.c = res;
        }
        this._element = this.create('div',
            {style:"display:grid", className:"redact_table"}, ...this.c);
        let b = new button('Сохранить', true, this.save, this);
        b.draw();
        this._element.appendChild(b.element);
        console.log(this.c);
    }

    save(dad) {
        let inputs = dad.element.querySelectorAll("input");
        let data = {};
        data.time_update = Date.now();
        data.is_delete = false;
        data.GUID = dad._GUID;
        for (let i = 0; i < inputs.length; i++) {
            data[dad._data[i]] = inputs[i].value;
        }

        console.log(data);
        update_table(dad._table_name, data);
    }

    select() {
        //alasql('ATTACH localStorage DATABASE lsdb AS db');
        //alasql.use("db");
        console.log('Current database:', alasql.useid);
        //let db = alasql.Database('db');

        let sel = alasql(this._query);
        console.log(sel);
        return sel;
    }
}
function ac(prot, sel, a, create) {
    let param = undefined;
    if (a === undefined) {
        param = {
            GUID: sel.GUID,
            is_delete: sel.is_delete,
            time_update: sel.time_update
        };
        delete sel.GUID;
        delete sel.is_delete;
        delete sel.time_update;
    }
    //sel_object = sel;
    let elems = [];
    let i = 0;
    let j = 0;
    let e = [];
    Object.keys(sel).forEach(key => {
        elems[i] = new label(prot[j]);
        elems[i].draw();
        elems[i] = elems[i].element;
        i++;
        elems[i] = new data_label(sel[key]);
        elems[i].draw();
        elems[i] = elems[i].element;
        e[j] = create('div', {}, elems[i - 1], elems[i]);
        i++;
        j++;
    });
    return e;
}