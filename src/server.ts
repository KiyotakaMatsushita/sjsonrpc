import { JSONRPC, JSONRPC_ID, RESULT, REQUEST, RESPONSE } from "./types";

import { ERROR_CODES, getErrorResponse } from "./error";

type PROMISE_FUNCTION = (params: any) => Promise<any>;

type methods = { [k: string]: PROMISE_FUNCTION };

interface SERVER {
  addMethod: (methodName: string, f: Function) => void;
  execute: (d: REQUEST) => Promise<RESPONSE>;
}

interface SUCCESS_RESPONSE {
  jsonrpc: JSONRPC;
  result: RESULT;
  id: JSONRPC_ID;
}

const isInvalidRequest = (params: any) => {
  return ["method", "jsonrpc", "params"].some(e => {
    return !params[e];
  });
};

export const server = (): SERVER => {
  let methods: methods = {};
  return {
    addMethod: (methodName, f) => {
      methods[methodName] = async (params: any) => {
        return f(params);
      };
    },
    execute: async (d: REQUEST) => {
      if (!d) {
        return getErrorResponse(ERROR_CODES.PARSE_ERROR);
      }
      if (isInvalidRequest(d)) {
        return getErrorResponse(ERROR_CODES.INVALID_REQUEST);
      }
      var method = d.method;
      var params = d.params;
      var id = d.id;
      if (!methods[method]) {
        console.error(method + " is not found");
        return getErrorResponse(ERROR_CODES.METHOD_NOT_FOUND, id);
      }
      try {
        const result = await methods[method](params);
        return getSuccessResponse(id, result);
      } catch (e) {
        console.error(
          "INTERNAL ERROR:\n",
          "ERROR_MESSAGE: " + e.message + "\n",
          "PARAMS:",
          d
        );
        return getErrorResponse(ERROR_CODES.INTERNAL_ERROR, id);
      }
    }
  };
};

const getSuccessResponse = (
  id: JSONRPC_ID = null,
  result: RESULT = {}
): SUCCESS_RESPONSE => {
  return {
    jsonrpc: JSONRPC,
    result,
    id
  };
};
