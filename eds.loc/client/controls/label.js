import control from "./control.js";
class label extends control {
    constructor(text, isBold) {
        super();
        this._isBold = 'font-weight: normal';
        this._text = text;
        //this.
        if (isBold) {
            this._isBold = 'font-weight: bold';
        }
        //this._element = undefined;
    }
    draw() {
        this._element = this.create('label', {style:this._isBold}, this._text);
    }
    get value() {
        return this._text;
    }

    set value(newText) {
        //this._element.removeChild(this._element.firstChild);
        this._text = newText;
        //this._element.();
        //this._element.createTextNode(this._text);//=this._text;
        //this._element.innerHTML = this._text;
        //this._element.childNodes[0].textContent = this._text;
        // const child = document.createTextNode(this._text);
        // this._element.appendChild(child);
        this._element.textContent = this._text;
    }
}

export default label;

// let c = new label(false, 'asd');
// console.log(c);
// c.draw();
// console.log(c._element);
// document.body.appendChild(c._element);
