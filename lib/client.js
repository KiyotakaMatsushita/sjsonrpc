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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const axios_1 = __importDefault(require("axios"));
exports.client = function (endpoint) {
    var count = 1;
    return {
        send: (method, params = {}, id = null) => __awaiter(this, void 0, void 0, function* () {
            let p = {
                jsonrpc: types_1.JSONRPC,
                method,
                params,
                id: id || count++
            };
            return yield axios_1.default.post(endpoint, p).then(res => {
                return res.data;
            });
        })
    };
};
