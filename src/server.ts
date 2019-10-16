import {
  jsonrpcId,
  jsonrpcResult,
  tJsonrpcReqest,
  tJsonrpcResponse
} from "./types";
import { ERROR_CODES, getErrorResponse } from "./error";

type TFuncPromise = (params: any) => Promise<any>;

type methods = { [k: string]: TFuncPromise };

interface service {
  addMethod: (methodName: string, f: Function) => void;
  execute: (d: tJsonrpcReqest) => Promise<tJsonrpcResponse>;
}

interface responseOnSuccess {
  jsonrpc: "2.0";
  result: jsonrpcResult;
  id: jsonrpcId;
}

const isInvalidRequest = (params: any) => {
  return ["method", "jsonrpc", "params"].some(function(e) {
    return !params[e];
  });
};

export const server = function(): service {
  let methods: methods = {};
  return {
    addMethod: (methodName, f) => {
      methods[methodName] = async function(params: any) {
        return f(params);
      };
    },
    execute: async (d: tJsonrpcReqest) => {
      if (!d) {
        return getErrorResponse(ERROR_CODES.PARSE_ERROR);
      }
      if (isInvalidRequest(d)) {
        return getErrorResponse(ERROR_CODES.INVALID_REQUEST, d);
      }
      var method = d.method;
      var params = d.params;
      var id = d.id;
      if (!methods[method]) {
        console.error(method + " is not found");
        return getErrorResponse(ERROR_CODES.METHOD_NOT_FOUND, d);
      }
      try {
        const result = await methods[method](params);
        return getSuccessResponse(id, result);
      } catch (e) {
        return getErrorResponse(ERROR_CODES.INTERNAL_ERROR, e.message);
      }
    }
  };
};

const getSuccessResponse = function(
  id: jsonrpcId = null,
  result: jsonrpcResult = {}
): responseOnSuccess {
  return {
    jsonrpc: "2.0",
    result,
    id
  };
};
