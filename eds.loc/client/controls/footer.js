import control from "./control.js";
import timer from "./timer.js"

class footer extends control {
    constructor() {
        super();

    }
    draw() {
        let tm = new timer();
        tm.draw();
        this._element = this.create('footer', {}, tm._element);
    }
}
export default footer;