const libs = require('nodex-libs');
const http = libs.http;

const logic = require('./logic');

exports.start = async function (args) {
    let app = http.webapp(args);

    app.route(router => {
        router.get('/', http.handler(logic.index))
        router.post('/add_data', http.handler(logic.addData));
        router.post('/get_data_by_id', http.handler(logic.getDataById));
        router.post('/update_data', http.handler(logic.updateData));
        router.post('/delete_data', http.handler(logic.deleteData));
        router.post('/list_data', http.handler(logic.listData));
    });

    app.start();
};
