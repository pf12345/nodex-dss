const libs = require('nodex-libs');
const http = libs.http;

const logic = require('./logic');

exports.start = async function (args) {
    let app = http.webapp(args);

    app.route(router => {
        router.get('/', http.handler(logic.index))
        router.post('/add_data', http.handler(logic.addData));
    });

    app.start();
};
