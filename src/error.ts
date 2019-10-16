import { ERROR_RESPONSE, ERROR, JSONRPC, JSONRPC_ID } from "./types";

export enum ERROR_CODES {
  PARSE_ERROR = -32700,
  INVALID_REQUEST = -32600,
  METHOD_NOT_FOUND = -32601,
  INVALID_PARAMS = -32602,
  INTERNAL_ERROR = -32603
}

export type ERROR_MESSAGES = { [k in ERROR_CODES]: string };

const ERROR_MESSAGES: ERROR_MESSAGES = {
  [-32700]: "Parse error",
  [-32600]: "Invalid request",
  [-32601]: "Method not found",
  [-32602]: "Invalid params",
  [-32603]: "Internal error"
};

export const getErrorResponse = (
  code: keyof ERROR_MESSAGES,
  id: JSONRPC_ID = null
): ERROR_RESPONSE => {
  const error: ERROR = {
    code: Number(code),
    message: ERROR_MESSAGES[code]
  };
  return {
    jsonrpc: JSONRPC,
    error,
    id
  };
};
