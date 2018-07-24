import control from "./control.js";
import menu from "./menu.js";
import search_panel from "./search_panel.js";

//Поместил в header, чтобы не ломалась кнопка назад
class top_panel extends control {
    constructor() {
        super();

        this._caption = undefined;
        this.captionElem = undefined;
        this._back_button = true;
        this.backElement = undefined;
        this.sync_progress = '0';
        this.search_panel = undefined;
    }
    draw() {
        let m = new menu();
        let sp = new search_panel();
        this.captionElem = this.create('h1', {},'a');
        if (this._back_button)
            this.backElement = this.create('button', {}, 'back');
        m.draw();
        sp.draw();
        this.search_panel = sp.element;
        this.container = this.create(
            'div',
            {},
            m.element,
            this.sync_progress, this.captionElem, this.backElement
        );
        //TODO поменять местоми кнопки на адекватном макете
        this._element = this.create('header', {}, this.container, this.search_panel);
    }

    set back_button(func) {
        if (this._back_button) {
            //TODO Слишком много листенеров
            this.backElement.addEventListener('click', func);

            this.backElement.style.visibility = 'visible';
        } else {
            this.backElement.style.visibility = 'hidden';
        }
    }

    refreshBB() {
        this.container.removeChild(this.backElement);
        this.backElement = this.create('button', {}, 'back');
        this.container.appendChild(this.backElement);
    }

    set caption(newCaption) {
        this._caption = newCaption;
        if (this._element !== undefined && this._caption !== undefined) {
            this.captionElem.textContent = this._caption;
        }
    }
}
export default top_panel;