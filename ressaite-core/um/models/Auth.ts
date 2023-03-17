import { RstResp } from "../../core/models/api";

export interface LoginReq {
  username: string;
  password: string;
}

export interface LoginSuccessfulResp {
  token: string;
}

export type LoginResp = RstResp<LoginSuccessfulResp>;

export interface SignUpReq {
  username: string;
  password: string;
}

export type SignUpResp = RstResp<null>;
