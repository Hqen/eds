import control from "./control.js";
import {application} from "../index.js";
import {open_PTL, open_PCL, open_PEL, open_main, exit} from "../helpers/help.js";

class menu extends control{
    constructor() {
        super();
    }

    draw() {
        this.page_task_list = this.create('li', { 'click': open_PTL }, 'Список задач');
        this.page_customer_list = this.create('li', { 'click': open_PCL }, 'Список заказчиков');
        this.page_equipment_list = this.create('li', { 'click': open_PEL }, 'Список оборудования');
        this.page_main = this.create('li', { 'click': open_main }, 'Главная страница');
        this.page_exit = this.create('li', { 'click': exit }, 'Выйти');
        this.u_list = this.create('ul', {},
            this.page_task_list,
            this.page_customer_list,
            this.page_equipment_list,
            this.page_main,
            this.page_exit
        );
        this._element = this.create('nav', {style:'width: 20px; height: 20px; background-color:red'},
            this.u_list
        );
    }
}

export default menu;