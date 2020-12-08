const libs = require('nodex-libs');
const http = libs.http;

const logic = require('./logic');

exports.start = async function (args) {
    let app = http.webapp(args);

    app.route(router => {
        router.post('/add', http.handler(logic.add));
        router.post('/get', http.handler(logic.get));
        router.post('/set', http.handler(logic.set));
        router.post('/del', http.handler(logic.del));
        router.post('/list', http.handler(logic.list));
    });

    app.start();
};