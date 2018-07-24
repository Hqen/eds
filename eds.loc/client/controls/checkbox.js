import label from "./label.js";

export class checkbox extends label {
    constructor(isVisible, isChecked, text, isBold) {
        super(text, isBold);
        this._is_visible = "visible";
        if (!isVisible) {
            this._is_visible = 'hidden';
        }
        this._is_checked = false;
        if (isChecked)
            this._is_checked = true;
        this.data = [];
    }
    draw() {
        let checkbox = this.create('input', {type:"checkbox", style:'visibility: ' + this._is_visible});
        checkbox.checked = this._is_checked;
        if (this._text === undefined)
            this._element = checkbox;
        else
            this._element = this.create('label', {style:this._isBold}, this._text, checkbox);
    }
    //TODO доделать
    onchange() {
        // if (this._element!==undefined)
        //     this._element.onchange???
    }
}