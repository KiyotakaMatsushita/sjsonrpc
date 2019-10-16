import { tResponseOnError, tError } from "./types";

export enum ERROR_CODES {
  PARSE_ERROR = -32700,
  INVALID_REQUEST = -32600,
  METHOD_NOT_FOUND = -32601,
  INVALID_PARAMS = -32602,
  INTERNAL_ERROR = -32603
}

export type tERROR_MESSAGES = { [k in ERROR_CODES]: string };

const ERROR_MESSAGES: tERROR_MESSAGES = {
  [-32700]: "Parse error",
  [-32600]: "Invalid request",
  [-32601]: "Method not found",
  [-32602]: "Invalid params",
  [-32603]: "Internal error"
};

export const getErrorResponse = function(
  code: keyof tERROR_MESSAGES,
  data?: any
): tResponseOnError {
  const error: tError = {
    code: Number(code),
    message: ERROR_MESSAGES[code]
  };
  if (!!data) {
    error.data = data;
  }
  return {
    jsonrpc: "2.0",
    error,
    id: null
  };
};
