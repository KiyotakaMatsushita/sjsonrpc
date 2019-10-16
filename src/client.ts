import { jsonrpcId, tJsonrpcReqest, tJsonrpcResponse } from "./types";
import axios from "axios";

export const client = function(endpoint: string) {
  var count = 1;
  return {
    send: async function(
      method: string,
      params: any = {},
      id: jsonrpcId = null
    ): Promise<tJsonrpcResponse> {
      let p: tJsonrpcReqest = {
        jsonrpc: "2.0",
        method,
        params,
        id: id || count++
      };
      return await axios.post(endpoint, p);
    }
  };
};
