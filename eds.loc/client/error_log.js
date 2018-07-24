class ErrorLog {
    constructor() {
        this.index = 0;
        this.register = [];
        // this.register[this.index] = [3];
        // this.register[this.index].err_obj = {};
        // this.register[this.index].message = "";
    }
    //
    // set i(val) {
    //     index += val;
    // }
    // get i() {
    //     return index;
    // }
    add(err_obj, message) {//TODO err_log max size
        this.register[this.index] = {
            date_time : Date(),//TODO отредактировать время на нормальный формат
            err_obj,
            message,
        };
        this.index++;
    }

    write() {
        let i = 1;
        for (let val of this.register) {
            // console.log("Время ошибки: " + val.date_time);
            // console.log("Объект ошибки: " + val.err_obj);
            // console.log("Сообщение: " + val.message);

            console.error(`
Ошибка № ${i}
Время ошибки: ${val.date_time}
Объект ошибки: ${val.err_obj.name}
Сообщение: ${val.message}
            `);
            i++;
        }
    }

}
export default ErrorLog;

// let er = new ErrorLog();
// let a = {name : "asd"};
//
// er.add("asd", "Пипец");
// er.add(4, "asd");
// er.add(a, "What is it?");
// er.write();
//
//     add(err_obj, message) {
//
//     }
// }