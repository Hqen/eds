export default function requestTo(to, stringData) {
    let baseURL = "http://www.eds.loc/api/";//писать через http
    let req = baseURL + to + "?" + stringData;
    return new Request(req);
}