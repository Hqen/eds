export default function requestTo(to, dataObj, method) {
    let baseURL = "http://eds.loc/api/";//писать через http
    let init = {method: method, mode: 'cors',};
    let req = baseURL + to;
    let dataStr = "";
    Object.keys(dataObj).forEach(key => {
        dataStr += key + "=" + dataObj[key] + "&";
    });
    dataStr = dataStr.slice(0, -1);
    if (method === "GET") {
        req += "?" + dataStr;
    }
    if (method === "POST") {
        init.body = 'param='+JSON.stringify(dataObj);
        init.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        // init.body.json();
    }
    return new Request(req, init);
}
(async () => {
        let resp = await fetch(requestTo("put_table_data.php", {a: 1, b: "asd"}, "POST"));
        let result = await resp.json();
        console.log(result);
    }
)();