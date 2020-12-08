'use strict';

const libs = require('nodex-libs');
const fmt = libs.fmt;
const data = require('./data');

let args = null;

exports.init = async function ($args) {
    args = $args;
};

exports.add = async function ({ appid, ...ret }) {
    fmt.required(appid, 'word', 4, 64);
    return await data.add({ appid, ...ret });
};

exports.get = async function ({ id, appid }) {
    fmt.required(appid, 'word', 4, 64);
    return await data.get(id, appid);
}

exports.set = async function ({ appid, id, ...ret }) {
    fmt.required(appid, 'word', 4, 64);
    fmt.required(id, 'word', 4, 64);
    return await data.set({ appid, id, ...ret });
}

exports.del = async function ({ query, appid }) {
    fmt.required(appid, 'word', 4, 64);
    return await data.del(appid, query);
}

exports.list = async function({ appid, page, size, query }) {
    fmt.required(appid, 'word', 4, 64);
    return await data.list(appid, page, size, query);
}