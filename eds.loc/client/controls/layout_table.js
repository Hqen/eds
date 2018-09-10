import control from "./control.js";
import {application} from "../index.js";

//TODO Перенести логику управления сюда, а остальные классы наследовать от этого
export class layout_table extends control {
    constructor() {
        super();
    }
    add() {

    }
    remove() {

    }
    rows() {

    }
}
// function remove_item(ti) {
//     if (confirm("Действительно хотите удалить?")) {
//         let dad = ti.element.parentElement;
//         dad.removeChild(ti.element);
//         console.log(ti);
//     }
// }
// add_item(dad, elems, param, page) {
//     let ti = new table_item(elems, param);
//     ti.draw();
//     //ti = add_buttons_and_return_ti(ti, dad);
//     ti.element.onclick = () => {
//         application.open(page, ti.GUID);
//         console.log(ti);
//     };
//     console.log("Кнопка добавлена");
//
//     if (dad === undefined) {
//         this._table_items[this._id] = ti.element;
//         this._id++;
//     } else {
//         dad.appendChild(ti.element);
//     }
//
// }
// }
