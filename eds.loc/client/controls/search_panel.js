import control from "./control.js";

class search_panel extends control {
    constructor() {
        super();
        this.search_text = '';
        this.search = '';
        this.visible = '';
    }
    draw() {
        this.search_panel = this.create('input', {type:'search', placeholder: 'search'});
        let close_button = this.create('button', {}, 'close');
        this._element = this.create('div', {}, this.search_panel, close_button);
    }
}

export default search_panel;