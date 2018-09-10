import control from "./control.js";

//onclick работает с лямбдой () => foo(outside)
class button extends control {
    constructor(caption, isVisible, onclick, ...arg) {
        super();
        this._caption = caption;
        this._isVisible = 'visible';
        this.onclick = onclick;
        if (!isVisible) {
            this._isVisible = 'hidden';
        }
        this._element = undefined;
        this.arg = arg;
    }
    draw() {
        this._element = this.create(
            'button',
            {style:'visibility: ' + this._isVisible, click: [this.onclick, this.arg]},
            this._caption
        );
    }
    set caption(value) {
        this._caption = value;
        if (this._element !== undefined)
            this._element.textContent = this._caption;
    }
    get caption() {
        return this._caption;
    }
}

export default button;