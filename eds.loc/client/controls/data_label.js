import label from "./label.js";

class  data_label extends label {
    //когда устанавливаются data_label.is_edit и
    constructor(text, isBold, data) {
        super(text, isBold);
        this._guid = '';
        this._data = data;
        this._char_type = 'TYPE_TEXT';//TYPE_INT; TYPE_NUMBER – целые и дробные числа;
        this._field_state = false;
        this.placeholder = "";
    }
    draw() {
        let tag;
        if (this._field_state)
            tag = 'p';
        else
            tag = 'input';
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
}

export default data_label;