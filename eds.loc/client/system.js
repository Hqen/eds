// function system() {
//     this.time_update = function() {
//
//     }
// }
//TODO как system будет использоваться c localstorage?
// class system {
//
// }

// for mobile
// system.live_search = false;
let system = {
    time_update : "0",
    user_level : 0,
    is_logged : false,
    private_key : "",
    GUID_device : "", //TODO найти в архит
    mail : "", //TODO base64?
    password : "", //TODO encode?
    encryption_seed : "",
    live_search_char_num : 3,
    live_search : false, //TODO for mobile
    font_name : "Roboto Regular, Verdana",
    font_size_label : "11pt",//TODO in arhitect type - number
    max_data_records : 60,
    sync_record_count : 20,
    sync_delay : 180000,
    max_error_records : 200,
};
//system импортируется поэтому не нужно его передавать в функцию
function writeSystem() {
    localStorage["system"] = JSON.stringify(system);
}

function readSystem() {
    system = JSON.parse(localStorage["system"]);
}

export {system, writeSystem, readSystem};