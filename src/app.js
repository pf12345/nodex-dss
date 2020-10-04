const libs = require('nodex-libs');

(async function () {
    try {
        const args = require("./args");
        libs.log.init(args.app.name);

        const data = require('./data');
        await data.init(args.data);

        const logic = require('./logic');
        await logic.init(args.logic);

        const serv = require('./serv');
        await serv.start(args.serv);
    }
    catch (err) {
        console.error(err.message);
    }
})();
