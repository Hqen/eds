import control from "./control.js";

class data_memo extends control {
    //TODO height нужна ли?
    constructor(text, isEdit, height) {
        super();
        this._isEdit = isEdit;
        this._text = text;
        this._element = undefined;
        this.placeholder = "";
    }
    draw() {
        this._element = this.create('textarea', {}, this._text);
        this._element.disabled = !this._isEdit;
        this._element.placeholder = this.placeholder;

    }
}

export default data_memo;