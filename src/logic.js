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
    const result = data.addData(body);
    return result;
};