import control from "./control.js";

class button extends control {
    constructor(caption, isVisible, onclick, ...arg) {
        super();
        this.caption = caption;
        this.isVisible = 'visible';
        this.onclick = onclick;
        if (!isVisible) {
            this.isVisible = 'hidden';
        }
        this._element = undefined;
        this.arg = arg;
    }
    draw() {
        this._element = this.create(
            'button',
            {style:'visibility: ' + this.isVisible, click: [this.onclick, this.arg]},
            this.caption
        );
    }
}

export default button;