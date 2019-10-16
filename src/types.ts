export type JSONRPC = "2.0";
export type jsonrpcId = number | string | null;
export type jsonrpcResult = any;
export type tJsonrpcReqest = {
  jsonrpc: JSONRPC;
  method: string;
  params: any;
  id: jsonrpcId;
};

export type tJsonrpcResponse = {
  jsonrpc: JSONRPC;
  result?: jsonrpcResult;
  error?: tError;
  id: jsonrpcId;
};

export type tError = {
  code: number;
  message: string;
  data?: any;
};

export type tResponseOnError = {
  jsonrpc: JSONRPC;
  error: tError;
  id: jsonrpcId;
};
