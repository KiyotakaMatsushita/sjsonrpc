"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
const isInvalidRequest = (params) => {
    return ["method", "jsonrpc", "params"].some(function (e) {
        return !params[e];
    });
};
exports.server = function () {
    let methods = {};
    return {
        addMethod: (methodName, f) => {
            methods[methodName] = function (params) {
                return __awaiter(this, void 0, void 0, function* () {
                    return f(params);
                });
            };
        },
        execute: (d) => __awaiter(this, void 0, void 0, function* () {
            if (!d) {
                return error_1.getErrorResponse(error_1.ERROR_CODES.PARSE_ERROR);
            }
            if (isInvalidRequest(d)) {
                return error_1.getErrorResponse(error_1.ERROR_CODES.INVALID_REQUEST, d);
            }
            var method = d.method;
            var params = d.params;
            var id = d.id;
            if (!methods[method]) {
                console.error(method + " is not found");
                return error_1.getErrorResponse(error_1.ERROR_CODES.METHOD_NOT_FOUND, d);
            }
            try {
                const result = yield methods[method](params);
                return getSuccessResponse(id, result);
            }
            catch (e) {
                return error_1.getErrorResponse(error_1.ERROR_CODES.INTERNAL_ERROR, e.message);
            }
        })
    };
};
const getSuccessResponse = function (id = null, result = {}) {
    return {
        jsonrpc: "2.0",
        result,
        id
    };
};
