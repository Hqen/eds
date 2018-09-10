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
        this.search_panel = undefined;
        this._data = {};
        this.position = 0;
        this.dad = document.querySelector('main');
        this.controls = {};
    }

    //Добавляет контролы на страницу
    draw() {
        Object.keys(this._data).forEach(key => {
            this.dad.appendChild(this._data[key].element);
        });
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
        while (this.dad.childNodes[0]) {
            this.dad.removeChild(this.dad.childNodes[0]);
        }
        this._data = {};
        this.controls = {};
    }
}
export default page;
