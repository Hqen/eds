//TODO переделать
import {get_AJAX_JSON} from "./helpers/help.js";
import {application} from "./index.js";

// window.addEventListener('DOMContentLoaded', createMailDiv);
//TODO Попробовать поменять область видимости
// let response;

// TODO Не работает
// export async function send_mail(mail) {
//     let body = "mail=" + encodeURIComponent(base64_encode(mail));
//     get_AJAX_JSON("GET", "authentic.php", body, (data) => {
//         check_key(data);
//     });
// }
//TODO Переделать метод тк форма отсутствует
//Передавать параметром в метод?
export function auth(mail, key) {
    console.log(mail.value);
    console.log(key.value);
    // send_mail(mail.value);
    check_mail_and_action(mail.value, check_key, key.value)
}

function check_mail_and_action(mail, func, arg) {
    let body = "mail=" + encodeURIComponent(base64_encode(mail));
    get_AJAX_JSON("GET", "authentic.php", body, (data) => {
        func(data, arg);
    });
}

function check_key(response, key) {
    console.log('pk = ' + response['public_key']);
    console.log('prk = ' + key);
    const seed = GetEncryptionSeed(response["public_key"], key);
    console.log(seed);
    //TODO занесение в localstorage
}

export function auth2(mail, pass) {
    console.log(mail.value);
    console.log(pass.value);
    check_mail_and_action(mail.value, check_pass, pass.value);
}

function check_pass(response, pass) {
    console.log(pass);
}

// function createMailDiv() {
//     // const label = create('label', {for:'mail'}, 'mail:');
//     // const input = create('input', {type: '_text', id:'mail', name:'key'});
//     // const mail = create('div',{}, label, input, button);
//
//     //TODO что лучше для понимания
//     const button = create('button', {id:'send_mail'}, 'Отправить');
//     button.addEventListener('click', send_mail);
//     const mail = create('div',{},
//         create('label', {for:'mail'}, 'Mail: '),
//         create('input', {type: '_text', id:'mail', name:'mail'}),
//         button);
//     //TODO куда добавлять
//     document.body.appendChild(mail);
// }
//
// function createPrivateKeyDiv() {
//     //TODO что лучше для понимания
//     const label = create('label', {for:'key'}, 'Ключ: ');
//     const input = create('input', {type: '_text', id:'key', name:'key'});
//     const button = create('button', {id:'auth'}, 'Проверить');
//     const pkForm = create('div',{}, label, input, button);
//
//     button.addEventListener('click', auth);
//     //TODO куда добавлять
//     document.body.appendChild(pkForm);
// }
//
// function createErrorDiv(error) {
//     const p = create('p', {}, error);
//     document.body.appendChild(p);
// }
//
// function deleteElem(elem) {
//     const el = elem.parentNode;
//     //TODO откуда удалять //document.body.div
//     document.body.removeChild(el);
// }
//
// function create(tag, props, ...children) {
//     const element = document.createElement(tag);
//
//     Object.keys(props).forEach(key => element[key] = props[key]);
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

function GetEncryptionSeed(publicKey, privateKey) {
    let alph = "abcdef";
    let res = "";
    publicKey = publicKey.toLowerCase();
    privateKey = privateKey.toLowerCase();
    console.log(privateKey);
    console.log(publicKey);

    for (let i = 0; i < publicKey.length; i++) {
        let c = findIndex(publicKey[i]) - findIndex(privateKey[i]);
        // c += 16;
        // c %= 16;
        c = (c + 16) % 16;
        if (c > 9) {
            //let a = alph[c - 10];
            res += alph[c - 10];
        } else {
            res += c;
        }
    }
    return res;
    function findIndex(symbol) {
        if ( alph.indexOf(symbol) !== -1 ) {
            let c = alph.indexOf(symbol);
            return 10 + c;
        } else {
            return +symbol;
        }
    }
}

function base64_encode( data ) {
    // Encodes _data with MIME base64
    //
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Bayron Guevara

    let b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1<<16 | o2<<8 | o3;

        h1 = bits>>18 & 0x3f;
        h2 = bits>>12 & 0x3f;
        h3 = bits>>6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    switch( data.length % 3 ){
        case 1:
            enc = enc.slice(0, -2) + '==';
            break;
        case 2:
            enc = enc.slice(0, -1) + '=';
            break;
    }

    return enc;
}