"use strict";
// import button from "./controls/button.js";
// //import control from "./controls/control.js";
// import data_label from "./controls/data_label.js";
// import data_memo from "./controls/data_memo.js";
// import data_select from "./controls/data_select.js";
// import label from "./controls/label.js";
// import top_panel from "./controls/top_panel.js";
// import { system, writeSystem } from "./system.js";
import page from "./controls/page.js";
import {topPanel, application} from "./index.js";
import SyncService from "./SyncService.js";
//TODO Task в асинхронных функциях
class Application {
    constructor() {
        this.page_list = [];
        this.action = 'PAGE_START';
        //this.back_button = undefined;
        //this.page_list[this.action].clear = undefined;
        this.sync = new SyncService();
        this.start_sync();
        console.log("Sync status: " + this.sync.status);
}
    start_sync() {
        let c = this.sync.run();
    }
    // static init(pg, page_obj) {
    //     pg.controls = page_obj.controls;
    //     pg.addAll(pg.controls);
    // }

    registryPage(page_obj, init) {
        let pg = new page();
        //pg.controls = page_obj.controls;
        pg.caption = page_obj.caption;
        pg.back_button = page_obj.back_button;
        this.page_list[page_obj.page_name] = {
            page: pg,
            init: init,
            name: page_obj.page_name,
        };
    }
    //2-й параметр только объект для возможности обращения по data.GUID и исключения null
    open(title, params) {
        let name = this.page_list[this.action].name;
        //this.page_list[this.action].page.data = params;
        let bb;
        if (title === "PAGE_START")//TODO заменить проверку на bb == false
            topPanel.refreshBB();
        if (title !== name)
            bb = () => application.open(name);//TODO вытащить параметры из name
        this.page_list[this.action].page.clear();
        this.action = title;
        let page = this.page_list[this.action].page;
        if (page === undefined) {
            alert("Страница не создана!");
            return;
        }
        //TODO переделать if в проверку на bb == false
        if (title !== "PAGE_SETTING_PRIVATE_KEY" && title !== "PAGE_LOGIN") {
            topPanel.caption = page.caption;
            topPanel._back_button = page.back_button;
            topPanel.back_button = bb;
        }
        // page.addAll(this.page_list[this.action].init());
        this.page_list[this.action].init(page, params);
        page.draw();
    }

    // open(page_title, page_params) {
    //     if (this.action !== '')
    //         this.page_list[this.action].clear();
    //     this.action = page_title;
    //     this.page_list[page_title].page.addAll(this.page_list[page_title].page.controls);
    //     this.page_list[page_title].page.draw();
    //     // this.page_list[page_title].init();
    //     //this.page_list[page_title].show();
    //     // this.page_list[page_title].addAll(this.page_list[page_title].controls);
    //     // this.page_list[page_title].draw();
    // }
    // open(page_obj) {
    //     let pg = new page();
    //     pg.controls = page_obj.controls;
    //     pg.addAll(pg.controls);
    //     pg.draw();
    // }

    // registryPage(page_obj, init) {//_name, page_caption, init_function, show_function, clear_function) {
    //     let _page = new page();
    //     _page.controls = page_obj.controls;
    //     _page.caption = page_obj.caption;
    //     //this.page_list[page_obj.page_name] = new page();
    //     this.page_list[page_obj.page_name] = {};
    //     this.page_list[page_obj.page_name].name = page_obj.page_name;
    //     this.page_list[page_obj.page_name].page = _page;
    //     // this.page_list[page_obj.page_name].init = function () {
    //     //     _page.controls = init;
    //     // };
    //     this.page_list[page_obj.page_name].show = function() {
    //         _page.addAll(_page.controls);
    //         _page.draw();
    //     };
    //     this.page_list[page_obj.page_name].clear = _page.clear();
    //     // let p = new page();
    //     // p.controls ={ c : new button(true, ads, "asd")};
    //     // function ads() {
    //     //     alert(123);
    //     // }
    //     // p.addAll(p.controls);
    //     // p.draw();
    //
    // }

    isOnline() {

    }

}
export default Application;
