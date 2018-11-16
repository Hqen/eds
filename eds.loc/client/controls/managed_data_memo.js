import data_memo from "./data_memo.js";
import control from "./control.js";
import label from "./label.js";
import button from "./button.js";

export class managed_data_memo extends control{
    constructor(props) {
        super();
        this._placeholder = props.placeholder;
        this._name = props.name;

    }
    draw() {
        let edit = (dm, obj) => {
            if (obj.edit_button.caption === "Изменить") {
                dm._element.disabled = false;
                obj.edit_button.caption = "Сохранить";
            } else if (obj.edit_button.caption === "Сохранить"){
                dm._element.disabled = true;
                obj.edit_button.caption = "Изменить";
            }

        };
        let label = new label(this._name, true);
        let dm = new data_memo(null, false);
        dm._placeholder = this._placeholder;
        this.edit_button = new button("Изменить", true, edit, dm, this);
        this._element = this.create('div', {},
            label._element, this.edit_button._element, dm);
    }
}