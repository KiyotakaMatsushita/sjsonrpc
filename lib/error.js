"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
var ERROR_CODES;
(function (ERROR_CODES) {
    ERROR_CODES[ERROR_CODES["PARSE_ERROR"] = -32700] = "PARSE_ERROR";
    ERROR_CODES[ERROR_CODES["INVALID_REQUEST"] = -32600] = "INVALID_REQUEST";
    ERROR_CODES[ERROR_CODES["METHOD_NOT_FOUND"] = -32601] = "METHOD_NOT_FOUND";
    ERROR_CODES[ERROR_CODES["INVALID_PARAMS"] = -32602] = "INVALID_PARAMS";
    ERROR_CODES[ERROR_CODES["INTERNAL_ERROR"] = -32603] = "INTERNAL_ERROR";
})(ERROR_CODES = exports.ERROR_CODES || (exports.ERROR_CODES = {}));
const ERROR_MESSAGES = {
    [-32700]: "Parse error",
    [-32600]: "Invalid request",
    [-32601]: "Method not found",
    [-32602]: "Invalid params",
    [-32603]: "Internal error"
};
exports.getErrorResponse = (code, id = null) => {
    const error = {
        code: Number(code),
        message: ERROR_MESSAGES[code]
    };
    return {
        jsonrpc: types_1.JSONRPC,
        error,
        id
    };
};
