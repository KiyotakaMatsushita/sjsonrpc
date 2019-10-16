import { JSONRPC_ID, REQUEST, RESPONSE, JSONRPC } from "./types";
import axios from "axios";

export const client = function(endpoint: string) {
  var count = 1;
  return {
    send: async (
      method: string,
      params: any = {},
      id: JSONRPC_ID = null
    ): Promise<RESPONSE> => {
      let p: REQUEST = {
        jsonrpc: JSONRPC,
        method,
        params,
        id: id || count++
      };
      return await axios.post(endpoint, p).then(res => {
        return res.data;
      });
    }
  };
};
