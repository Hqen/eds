import control from "./control.js";

class data_select extends control {
    constructor(isEdit, source) {
        super();
        this.count = 0;
        //TODO list
        this.list = {};
        this.select_index = 0;
        this.select_guid = '';
        this.select_value = 0;
        this.is_edit = isEdit;
        //this.list.value =
    }
    draw() {
        this._element = this.create('select', {});
    }
    load(object) {
        //for (let i = 0;
    }
    live_query() {

    }
    onchange() {

    }
}

export default data_select;