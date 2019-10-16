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
const types_1 = require("./types");
const error_1 = require("./error");
const isInvalidRequest = (params) => {
    return ["method", "jsonrpc", "params"].some(e => {
        return !params[e];
    });
};
exports.server = () => {
    let methods = {};
    return {
        addMethod: (methodName, f) => {
            methods[methodName] = (params) => __awaiter(void 0, void 0, void 0, function* () {
                return f(params);
            });
        },
        execute: (d) => __awaiter(void 0, void 0, void 0, function* () {
            if (!d) {
                return error_1.getErrorResponse(error_1.ERROR_CODES.PARSE_ERROR);
            }
            if (isInvalidRequest(d)) {
                return error_1.getErrorResponse(error_1.ERROR_CODES.INVALID_REQUEST);
            }
            var method = d.method;
            var params = d.params;
            var id = d.id;
            if (!methods[method]) {
                console.error(method + " is not found");
                return error_1.getErrorResponse(error_1.ERROR_CODES.METHOD_NOT_FOUND, id);
            }
            try {
                const result = yield methods[method](params);
                return getSuccessResponse(id, result);
            }
            catch (e) {
                console.error("INTERNAL ERROR:\n", "ERROR_MESSAGE: " + e.message + "\n", "PARAMS:", d);
                return error_1.getErrorResponse(error_1.ERROR_CODES.INTERNAL_ERROR, id);
            }
        })
    };
};
const getSuccessResponse = (id = null, result = {}) => {
    return {
        jsonrpc: types_1.JSONRPC,
        result,
        id
    };
};
