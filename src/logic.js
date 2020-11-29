'use strict';

const libs = require('nodex-libs');
const fmt = libs.fmt;
const data = require('./data');

let args = null;

exports.init = async function ($args) {
    args = $args;
};

exports.index = function() {
    return 'nodex-dss'
}

exports.addData = async function (body) {
    const { appid } = body;
    fmt.required(appid, 'word', 4, 64);
    const result = await data.addData(body);
    return result;
};

exports.getDataById = async function ({ id, appid }) {
    fmt.required(appid, 'word', 4, 64);
    console.log(appid)
    const result = await data.getDataById(id, appid);
    console.log(result)

    return result;
}

exports.updateData = async function (body) {
    const { appid } = body;
    fmt.required(appid, 'word', 4, 64);
    const result = await data.updateData(body);
    return result;
}

exports.deleteData = async function ({ id, appid }) {
    fmt.required(appid, 'word', 4, 64);
    const result = await data.deleteData(id, appid);
    return result;
}

exports.listData = async function({ appid, page, size, query }) {
    fmt.required(appid, 'word', 4, 64);
    const result = await data.listData(appid, page, size, query);
    return result;
}