import control from "./control.js";
import button from "./button.js";
import {popup_view} from "./popup_view.js";
import label from "./label.js";
import data_label from "./data_label.js";
import {application} from "../index.js";
import {update_table} from "../helpers/help.js";
import {new_GUID} from "../helpers/help.js";

//TODO добавить функционал:
//TODO имя таблицы
//TODO дополнительные кнопки
//TODO table_name не нужен
//TODO добавить обработку массивов инсёртов и селектов
//TODO добавить возможность передавать в table_click функцию(для popup)

//жесть
//TODO сохранение не работает!
//TODO при закрытии всплывающего окна сохраняются введённые значения (очистку добавить)
let sel_object;
export class data_table extends control {
    constructor(data) {
        super();
        this._table_click = data.click;
        this._name = data.name;
        this._table_name = data.table_name;
        this._query = data.query;
        this._prototype = data.prototype;
        this._max_count = 50;//TODO Выборка из system
        this._table_items = [];//массив из table_item
        this._id = 0;
        this.sel = this.select();
        this.parse_data();
        this.add_popup();
    }

    add_popup() {
        this.popup = new popup_view();

        this.c = [];

        for (let i = 0, j = 0; j < this._prototype.length; i++, j++) {
            this.c[i] = new label(this._prototype[j]);
            i++;
            this.c[i] = new data_label("", false);
        }
        console.log(this.c);
        this.popup.draw();
        this.popup.addAll(this.c);
        this.popup.draw2();
        this.popup.hide();
    }

    parse_data() {
        let sel = this.sel;
        for (let i = 0; i < sel.length; i++) {
            let res = ac(this._prototype, sel[i]);
            this.add_item(undefined, res.elems, res.param, this._table_click);
        }
    }

    select() {
        let sel = alasql(this._query.select);
        console.log(sel);
        return sel;
    }

    draw() {
        let add = new button("Добавить", true, show_popup, this.popup);
        add.draw();

        this._element = this.create('div',
            {style:"display:grid", className:"data_table"},
            add.element, this.popup.element, ...this._table_items);

        let buttons = {
            cancel: new button("Отмена", true, hide_popup, this.popup),
            //TODO добавить
            enter: new button("Сохранить", true, this.save, this)
        };
        this.popup.addAll(buttons);
        this.popup.draw2();
    }
    //TODO переписать на query.input
    save(dad) {
        let inputs = dad.popup.element.querySelectorAll("input");

        let dataa = [];
        for (let i = 0; i < inputs.length; i++) {
            dataa[i] = inputs[i].value;
        }
        let res = ac(dad._prototype, dataa, "A");
        dad.add_item(dad.element, res.elems, res.param, dad._table_click);

        // let i = 0;
        // let k = 0;
        // let data = [];
        // if ('GUID' in data || data.GUID === undefined) {
        //     data[i] = Date.now();
        //     i++;
        //     data[i] = false;
        //     i++;
        //     data[i] = new_GUID();
        //     i++;
        // }
        // for (k = i; i < dataa.length + k; i++) {
        //     data[i] = dataa[i - k];
        // }
        // let indexes = data_for_update();
        // let ress = {};
        // for (let j = 0; j < indexes.length; j++) {
        //     ress[indexes[j]] = data[j];
        // }
        // alasql(`INSERT INTO ${dad._table_name} VALUES ?`, [ress]);
        // let a = alasql(`SELECT * FROM ${dad._table_name} WHERE GUID = '${ress.GUID}'`);
        // console.log("Данные записаны: ");
        // console.log(a);
        // function data_for_update() {
        //     let c = localStorage['lsdb.' + dad._table_name];
        //     let b = JSON.parse(c);
        //     let n =  b.columns;
        //     let data = [];
        //     for (let i = 0; i < n.length; i++) {
        //         data[i] = n[i].columnid;
        //     }
        //     return data;
        // }
        // hide_popup(dad.popup);
    }

    add_item(dad, elems, param, click) {
        let ti = new table_item(elems, param);
        ti.draw();
        //ti = add_buttons_and_return_ti(ti, dad);
        ti.element.onclick = () => {
            //TODO пробный
            click(ti.GUID);
            //application.open(page, ti.GUID);
            console.log(ti);
        };
        console.log("Кнопка добавлена");

        if (dad === undefined) {
            this._table_items[this._id] = ti.element;
            this._id++;
        } else {
            dad.appendChild(ti.element);
        }

    }
}

class table_item extends control {
    constructor(elems, param) {
        super();
        this._elems = elems;
        if (param !== undefined) {
            this.GUID = param.GUID;
        } else {
            this.GUID = new_GUID();
            // this.is_delete = false;
            // this.time_update = Date.now();
        }
    }
    draw() {
        // let eld = [];
        // for (let i = 0; i < this._elems.length; i++) {
        //     this._elems[i].draw();
        //     eld[i] = this._elems[i].element;
        // }
        this._element = this.create('div', {style: "display:grid"}, ...this._elems);// ...eld);
    }
}
function remove_item(ti) {
    if (confirm("Действительно хотите удалить?")) {
        let dad = ti.element.parentElement;
        dad.removeChild(ti.element);
        console.log(ti);
    }
}

function add_buttons_and_return_ti(ti, popup) {
    let del =  new button('del', true, remove_item, ti);//.element);
    del.draw();
    let redact = new button('ред', true, redact_item, ti, popup);
    redact.draw();

    ti.element.appendChild(del.element);
    ti.element.appendChild(redact.element);
    return ti;
}

function redact_item(ti, popup) {
    show_popup(popup);
    let inputs = popup.element.querySelectorAll("input");
    for (let i = 0, j = 0; i < ti._elems.length; i++) {
        if ((i+1) % 2 === 1) {
            inputs[j].value = ti._elems[i + 1].textContent;
            j++;
        }
    }
}

function hide_popup(popup) {
    let inputs = popup.element.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    popup.hide();
}

function show_popup(popup) {
    popup.show();
}

//TODO расширить функционал
function ac(prot, sel, a) {
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
    Object.keys(sel).forEach(key => {
        elems[i] = new label(prot[j]);
        elems[i].draw();
        elems[i] = elems[i].element;
        i++; j++;
        elems[i] = new label(sel[key]);
        elems[i].draw();
        elems[i] = elems[i].element;
        i++;
    });
    return {elems, param}
}