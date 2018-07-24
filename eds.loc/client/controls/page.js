//Основная страница
"use strict";
import control from "./control.js";
import top_panel from "./top_panel.js";

class page extends control {
    constructor(data) {
        super();
        if (data !== undefined)
            this.data = data;
        this.caption = undefined;
        this.back_button = undefined;
        this._data = {};
        this.position = 0;
        this.dad = document.querySelector('main');
        this.controls = {};
    }

    //свойство. имя страницы, которое будет отображено на верхней панели
    // set caption(val) {
    //     //TODO более адекватное решение что-ли...
    //     this._caption = val;
    //     //top_panel.caption = this._caption;
    // }

    // set controls() {
    //
    // }

    //Добавляет контролы на страницу
    draw() {
        Object.keys(this._data).forEach(key => {
            // this._data[key].draw();
            this.dad.appendChild(this._data[key].element);
        });
        // for (let elem of this._data) {
        //     let control = elem.draw();
        //     this.dad.appendChild(control.element);
        // }
    }

    //метод, добавляет контрол в конец страницы (ну т.е. по порядку)
    //Функция может работать нестабильно
    add(control) {
        //this.dad.appendChild(control);//отрисовка
        this._data[this.position] = control;
        this.position++;
    }

    //Добавляет контролы в лист контролов и отрисовывает их в памяти
    //т.е в элементе будет лежать тэг <input>, к примеру
    addAll(controls) {
        //TODO как именно добавляется контрол?
        //Object.keys(controls).forEach(key => this.add(controls[key].element));//отрисовка
        Object.keys(controls).forEach(key => {
            this._data[key] = controls[key];
            this._data[key].draw();
            // this._data[this.position] = controls[key];
            // this._data[this.position].draw();
            // // this.dad.appendChild(this._data[this.position].element);
            // this.position++;
        });
    }

    //TODO
    //метод, вставляет контрол в позицию по индексу на странице
    insert(control, index) {
        //TODO как именно добавляется контрол?
        for (let i = this.position - 1; i > index; i--) {
            this._data[i + 1] = this._data[i];
        }
        this._data[index] = control;
    }

    //удалять только из функции!!!
    clear() {
        // document.selectAllChildren(this.dad);
        // let elem = this.dad.firstChild;
        // while (elem !== null) {
        //     this.dad.removeChild(elem);
        //     elem = this.dad.firstChild;
        // }
        while (this.dad.childNodes[0]) {
            this.dad.removeChild(this.dad.childNodes[0]);
        }
        this._data = {};
        this.controls = {};
        //this.controls = undefined;
    }
}
export default page;

// class page extends control{
//     constructor() {
//         super();
//         this.capt = "";
//         this.back_butt = false;
//         this._data = [];
//         this.index = 0;
//         this.dad = document.body.getElementsByTagName('div');
//     }
//
//     //свойство. имя страницы, которое будет отображено на верхней панели
//     set caption(val) {
//         this.capt = val;
//     }
//
//     // get Caption() {
//     //     return this.capt;
//     // }
//
//     //свойство. должна ли быть кнопка назад у страницы. Принимает true или false
//     set back_button(val) {
//         this.back_butt = val;
//     }
//     //метод, добавляет контрол в конец страницы (ну т.е. по порядку)
//     addAll(controls) {
//         //TODO как именно добавляется контрол?
//         // this._data[this.index] = control;
//         // control.appendChild('div');
//         // this.index++;
//         //this.dad.appendChild(controls);
//         controls.forEach(control => {
//             this.dad.appendChild(control);
//         });
//     }
//
//     add(control) {
//         this.dad.appendChild(control);
//     }
//
//     //метод, вставляет контрол в позицию по индексу на странице
//     insert(control, index) {
//         //TODO как именно добавляется контрол?
//         for (let i = this.index - 1; i > index; i--) {
//             this._data[i + 1] = this._data[i];
//         }
//         this._data[index] = control;
//     }
// }
// export {page};
////test
// let pg = new page();
// pg.add("a");
// pg.add("b");
// pg.add("c");
// pg.add("d");
// pg.add("e");
// console.log(pg._data);
// pg.insert("n", 2);
// console.log(pg._data);