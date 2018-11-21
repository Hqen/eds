import label from "./label.js";

class  data_label extends label {
    //когда устанавливаются data_label.is_edit и
    constructor(text, isBold, field_state, data) {
        super(text, isBold);
        this._guid = '';
        this._data = data;
        this._char_type = 'TYPE_TEXT';//TYPE_INT; TYPE_NUMBER – целые и дробные числа;
        this._field_state = field_state;
        this.placeholder = "";
    }
    draw() {
        let tag = this._field_state ? 'p' : 'input';
        this._element = this.create(
            tag,
            {style:this._isBold, className:'data_label'/*, id:this.guid*/},
            this._text
        );
        if (tag === 'input') {
            this._element.value = this._text;
            this._element.placeholder = this.placeholder;
        }
    }

    set field_state(val) {
        this._field_state = val;
        if (this._element !== undefined) {
            let old = Object.assign({}, this);
            if (this._field_state)
                this.text = old._element.value;
            else
                this._text = old._element.textContent;

            this.draw();
            old._element.parentNode.replaceChild(this._element, old._element);
        }
    }

    // field_state(old, val) {
    //     this._field_state = val;
    //     if (this._element !== undefined) {
    //         this.draw();
    //         old._element.parentNode.replaceChild(this.element, old);
    //     }
    // }
}

export default data_label;