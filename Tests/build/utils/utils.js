"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = function (a, b) { return a + b; };
exports.square = function (a) { return a * a; };
exports.asyncAdd = function (a, b) {
    return new Promise(function (resolve, reject) {
        resolve(a + b);
    });
};
