"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
function _fetch(url, _a, data, queryParams) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.responseAs, responseAs = _b === void 0 ? 'json' : _b, opts = __rest(_a, ["responseAs"]);
    opts.headers = __assign({ Accept: 'application/json', 'Content-Type': 'application/json' }, opts.headers);
    if (queryParams) {
        url += "?" + new URLSearchParams(queryParams);
    }
    if (data !== undefined) {
        opts.body = JSON.stringify(data);
    }
    else {
        delete opts.body;
    }
    return fetch(url, opts).then(function (response) {
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }
        if (responseAs === 'response') {
            return response;
        }
        if (response.status === 204) {
            return null;
        }
        return response[responseAs]();
    });
}
function esfetch(url, opts) {
    if (opts === void 0) { opts = {}; }
    var _ = function (url_addition, opts_addition) {
        if (opts_addition === void 0) { opts_addition = {}; }
        return esfetch(url + '/' + url_addition, __assign({}, opts, opts_addition));
    };
    _.get = function (queryParams) {
        return _fetch(url, __assign({}, opts, { method: 'GET' }), undefined, queryParams);
    };
    _.post = function (data) { return _fetch(url, __assign({}, opts, { method: 'POST' }), data); };
    _.put = function (data) { return _fetch(url, __assign({}, opts, { method: 'PUT' }), data); };
    _.patch = function (data) { return _fetch(url, __assign({}, opts, { method: 'PATCH' }), data); };
    _["delete"] = function () { return _fetch(url, __assign({}, opts, { method: 'DELETE' })); };
    return _;
}
exports["default"] = esfetch;
