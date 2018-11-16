import control from "./control.js";
//TODO функции работают так же как и в page
export class popup_view extends control {
    constructor() {
        super();
        this._data = {};
        this.position = 0;
        //this.dad = document.querySelector('main');
        this._controls = {};
    }
    draw() {
        //TODO будет ли работать
        this._element = this.create('div', {});//, ...this._controls);
    }
    add(control) {
        //this.dad.appendChild(control);//отрисовка
        this._controls[this.position] = control;
        this.position++;
    }
    addAll(controls) {
        //TODO как именно добавляется контрол?
        //Object.keys(controls).forEach(key => this.add(controls[key].element));//отрисовка
        Object.keys(controls).forEach(key => {
            this._data[key] = controls[key];
            this._data[key].draw();
            ///////////////////////////////////////////////
            this._data[key] = this._data[key]._element;//
            // this._data[this.position] = controls[key];
            // this._data[this.position].draw();
            // // this.dad.appendChild(this._data[this.position].element);
            // this.position++;
        });
    }
    draw2() {
        Object.keys(this._data).forEach(key => {
            this._element.appendChild(this._data[key]);
        });
    }
    insert(control, index) {
        for (let i = this.position - 1; i > index; i--) {
            this._controls[i + 1] = this._controls[i];
        }
        this._controls[index] = control;
    }
    show() {
        this._element.style.display = "grid";
    }
    hide() {
        this._element.style.display = "none";
    }
}