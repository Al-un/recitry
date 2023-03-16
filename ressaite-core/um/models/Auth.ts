import { RstErrorResp } from "../../core/models/api";

export interface SignUpReq {
  username: string;
  password: string;
}

export type SignUpResp = null | RstErrorResp;
