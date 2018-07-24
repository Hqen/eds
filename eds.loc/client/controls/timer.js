import control from "./control.js";

class timer extends control {
    constructor() {
        super();
    }
    draw() {
        //TODO откуда использовать иконки
        let first = this.create('div', {}, "Запустить");//пауза
        let second = this.create('div', {}, "Отменить");
        let third = this.create('div', {}, "Завершить");

        this._element = this.create('div', {}, "Таймер", first, second, third);
    }
    show() {
        this._element.style.visibility = "visible";
    }
    hide() {
        this._element.style.visibility = "hidden";
    }
    start() {

    }
    stop() {

    }
    pause() {

    }
}
export default timer;