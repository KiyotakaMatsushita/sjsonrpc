export type JSONRPC = "2.0";
export const JSONRPC: JSONRPC = "2.0";
export type JSONRPC_ID = number | string | null;
export type RESULT = any;
export type ERROR = {
  code: number;
  message: string;
  data?: any;
};

export interface REQUEST {
  jsonrpc: JSONRPC;
  method: string;
  params: any;
  id: JSONRPC_ID;
}

export interface RESPONSE {
  jsonrpc: JSONRPC;
  result?: RESULT;
  error?: ERROR;
  id: JSONRPC_ID;
}

export interface ERROR_RESPONSE {
  jsonrpc: JSONRPC;
  error: ERROR;
  id: JSONRPC_ID;
}
