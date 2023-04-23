export interface RstErrorResp {
  errorCode?: number;
  message?: string;
}

export type RstResp<ResponseFormat> = ResponseFormat | RstErrorResp;
