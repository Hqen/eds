//import control from "./controls/control.js";
import page from "./controls/page_menu.js";
import button from "./controls/button.js";
//import control from "./controls/control.js";
import data_label from "./controls/data_label.js";
import data_memo from "./controls/data_memo.js";
import data_select from "./controls/data_select.js";
import label from "./controls/label.js";
// import menu from "./controls/menu.js";
import top_panel from "./controls/top_panel.js";

let page_c = new page();
// const label_1 = new label(false, 'Привет ');
// const button_1 = new button(true, asd, 'Do it');
// const ta_1 = new data_memo(true, 0, 'asd asd');
// let label_2 = new label(true, 'Привет');
// label_2._text = "asd";
page_c.controls = {
    label_1: new label(false, 'Привет '),
    button_1 : new button(true, asd, 'Do it'),
    ta_1 : new data_memo(false, 0, 'disable'),
    ta_2 : new data_memo(true, 0, 'edit'),
};

page_c.addAll(page_c.controls);

page_c.controls.label_2 = new label(true, 'Привет');
page_c.add(page_c.controls.label_2);

page_c.draw();

print(page_c.controls);

function asd() {
    page_c.controls.label_1.value = 'asd';
    page_c.controls.label_2.value = 'Получилось';
    alert('No!');
}

function print(vals) {
    Object.keys(vals).forEach(key => {
        console.log(vals[key]);
        console.log(vals[key].element);
    });
}

//
//
// let show_button = new button(true, show_page_c, 'click me');
// show_button.draw();
// document.body.insertBefore(show_button.element, m);
//
//
// function del() {
//     page_c.clear();
//     console.log(page_c);
// }
//
// let page_c = new page();
// let delete_button = new button(true, page_c.clear, 'удалить');
// delete_button.draw();
// document.body.insertBefore(delete_button.element, m);
// page_c.controls = {
//     label_1: new label(false, 'Привет '),
//     button_1: new button(true, asd, 'Do it'),
//     ta_1: new data_memo(false, 0, 'disable'),
//     ta_2: new data_memo(true, 0, 'edit'),
// };
// console.log(page_c);
// page_c.addAll(page_c.controls);
// page_c.controls.label_2 = new label(true, 'Привет');
// page_c.add(page_c.controls.label_2);
// function show_page_c() {
//     console.log(page_c);
//     page_c.draw();
//     console.log(page_c);
//
//     print(page_c.controls);
//     page_c.caption = 'asd';
//
//     console.log(page_c.controls);
// }
//
// function asd() {
//     page_c.controls.label_1.value = 'asd';
//     page_c.controls.label_2.value = 'Получилось';
//     alert('No!');
// }
//
// function print(vals) {
//     Object.keys(vals).forEach(key => {
//         console.log(vals[key]);
//         console.log(vals[key].element);
//     });
// }
//
//
//
//
// //обёртка какой-нибудь функцией для GC
// let page_main = new page();
// page_main.controls = {
//     label: new label(false, 'Привет world'),
//     button: new button(true, asd, 'Just do it'),
// };
// page_main.caption = "main page";
// page_main.back_button = page_main_clear;
//
// function page_main_init() {
//     page_main.addAll(page_main.controls);
// }
//
// function page_main_show() {
//     page_main.draw();
// }
//
// function page_main_clear() {
//     page_main.clear();
//     page_main = undefined;
// }
//
// page_main_init();
// page_main_show();
// //setTimeout(page_main_clear, 1000);

// const page_c = new page();
// //функционал function page_customer_description_init() {
// page_c.controls = {
//     layout_table: create('table', {}),
//     label_cust_title: create('label', {style:'font-weight : bold', className: 'test'},'Название заказчика'),
//     label_cust_address: create('label', {style:'font-weight : bold'}, 'Адрес заказчика'),
//     button_1: create('button', {click: asd, style:'font-weight : bold'}, 'Сделать!'),
// };
// //функционал function page_customer_description_show() {
// page_c.addAll(page_c.controls);
//
// page_c.controls.label_cust = create('label', {style:'font-weight : bold', className: 'test'},'Ads заказчика');
//
// page_c.add(page_c.controls.label_cust);
//
// //для clear ещё не придумал

// //TODO спросить про всё вот это
// // function Application() {
// //     this.open = function (page_title, page_params) {
// //
// //     };
// //     this.registryPage = function (page_name, page_caption, init_function, show_function, clear_function) {
// //         let page = new page(page_name, Application.page_place, page_name);
// //         eval(page_name+' = page');
// //         this.page_list[page.name] = page;
// //         this.page_list[page.name].init = init_function;
// //         this.page_list[page.name].show = show_function;
// //         this.page_list[page.name].clear = clear_function;
// //         this.page_list[page.name].description = page_description;
// //     }
// // }
// //import {page} from './controls/page';
// class page {
//     constructor() {
//         this.capt = "";
//         this.back_butt = false;
//         this._data = [];
//         this.index = 0;
//         this.dad = document.querySelector('div');
//     }
//
//     //свойство. имя страницы, которое будет отображено на верхней панели
//     set caption(val) {
//         this.capt = val;
//     }
//
//     //свойство. должна ли быть кнопка назад у страницы. Принимает true или false
//     set back_button(val) {
//         this.back_butt = val;
//     }
//
//     // set controls() {
//     //
//     // }
//     //метод, добавляет контрол в конец страницы (ну т.е. по порядку)
//     add(control) {
//         this.dad.appendChild(control);
//     }
//     addAll(controls) {
//         //TODO как именно добавляется контрол?
//         Object.keys(controls).forEach(key => this.add(controls[key]));
//
//     }
//
//     //метод, вставляет контрол в позицию по индексу на странице
//     insert(control, index) {
//         //TODO как именно добавляется контрол?
//         for (let i = this.index - 1; i > index; i--) {
//             this._data[i + 1] = this._data[i];
//         }
//         this._data[index] = control;
//     }
// }
//
// function asd() {
//     alert('No');
// }
//
// function create(tag, props, ...children) {
//     const element = document.createElement(tag);
//
//     Object.keys(props).forEach(key => {
//         if (key.startsWith('onclick')) {
//             element.setAttribute(key, props[key].name + '()');
//             element.onclick = props[key];
//         }
//         // if (key.startsWith('click')) {
//         //     element.addEventListener(key, props[key]);
//         // }
//
//         if (typeof props[key] === "function") {
//             element.addEventListener(key, props[key]);
//         }
//         element[key] = props[key];
//     });
//
//     children.forEach(child => {
//         if (typeof child === 'string') {
//             child = document.createTextNode(child);
//         }
//
//         element.appendChild(child);
//     });
//
//     return element;
// }

// document.addEventListener("DOMContentLoaded",function() {
//     //получить кнопку
//     var mybutton = document.getElementById('send');
//     //подписаться на событие click по кнопке и назначить обработчик, который будет выполнять действия, указанные в безымянной функции
//     mybutton.addEventListener("click", function(){
//         //1. Сбор данных, необходимых для выполнения запроса на сервере
//         var name = document.getElementById('mail').value;
//
//     var request = new XMLHttpRequest();
//     request.open('GET','authentic.php',true);
//     request.addEventListener('readystatechange', function() {
//         if ((request.readyState==4) && (request.status==200)) {
//             var welcome = document.getElementById('welcome');
//             welcome.innerHTML = request.responseText;
//         }
//     });
//     request.send();
//     });
// });

//
// function authentic() {
//
//
//     var _data = document.getElementById('my_form');
//     var but = document.getElementById('submit');
//     but.preventDefault();
//     var c = _data.elements[0];
//     c = "YXN3";
//     _data.elements[0] = c;
//     but.click();
// }
// register = new ErrorLog;
// var c = 0;
// register.add(c,"asd");
// register.Write();
//
// var d = document,
//     myform,
//     output;
// // кроссбраузерная установка обработчика событий
// function addEvent(elem, type, handler){
//     if(elem.addEventListener){
//         elem.addEventListener(type, handler, false);
//     } else {
//         elem.attachEvent('on'+type, handler);
//     }
//     return false;
// }
// // Универсальная функция для создания нового объекта XMLHttpRequest
// function getXhrObject(){
//     if(typeof XMLHttpRequest === 'undefined'){
//         XMLHttpRequest = function() {
//             try {
//                 return new window.ActiveXObject( "Microsoft.XMLHTTP" );
//             } catch(e) {}
//         };
//     }
//     return new XMLHttpRequest();
// }
// // Функция Ajax-запроса
// function sendAjaxRequest(e){
//     var evt = e || window.event;
//     // Отменяем стандартное действие формы по событию submit
//     if(evt.preventDefault){
//         evt.preventDefault(); // для нормальных браузров
//     } else {
//         evt.returnValue = false; // для IE старых версий
//     }
//     // получаем новый XMLHttpRequest-объект
//     var xhr = getXhrObject();
//     if(xhr){
//         // формируем данные формы
//         var elems = myform.elements, // все элементы формы
//             url = myform.action, // путь к обработчику
//             params = [],
//             elName,
//             elType;
//         // проходимся в цикле по всем элементам формы
//         for(var i = 0; i < elems.length; i++){
//             elType = elems[i].type; // тип текущего элемента (атрибут type)
//             elName = elems[i].name; // имя текущего элемента (атрибут name)
//             if(elName){ // если атрибут name присутствует
//                 // если это переключатель или чекбокс, но он не отмечен, то пропускаем
//                 if((elType == 'checkbox' || elType == 'radio') && !elems[i].checked) continue;
//                 // в остальных случаях - добавляем параметр "ключ(name)=значение(value)"
//                 params.push(elems[i].name + '=' + elems[i].value);
//             }
//         }
//         // Для GET-запроса
//         //url += '?' + params.join('&');
//
//         xhr.open('POST', url, true); // открываем соединение
//         // заголовки - для POST-запроса
//         xhr.setRequestHeader('Content-type', 'Application/x-www-form-urlencoded');
//         xhr.setRequestHeader('Content-length', params.length);
//         xhr.setRequestHeader('Connection', 'close');
//
//         xhr.onreadystatechange = function() {
//             if(xhr.readyState == 4 && xhr.status == 200) { // проверяем стадию обработки и статус ответа сервера
//                 output.innerHTML = JSON.parse(xhr.responseText); // если все хорошо, то выводим полученный ответ
//             }
//         }
//         // стартуем ajax-запрос
//         xhr.send(params.join('&')); // для GET запроса - xhr.send(null);
//     }
//     return false;
// }
//
// // Инициализация после загрузки документа
// function init(){
//     output = d.getElementById('output');
//     myform = d.getElementById('my_form');
//     addEvent(myform, 'submit', sendAjaxRequest);
//     return false;
// }
// // Обработчик события загрузки документа
// addEvent(window, 'load', init);
