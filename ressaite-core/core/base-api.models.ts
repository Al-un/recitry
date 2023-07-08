export interface RstErrorResp {
  errorCode?: number;
  message?: string;
}

export type RstResp<ResponseFormat> = ResponseFormat | RstErrorResp;

export type PaginatedResp<List> = {
  data: List;
  totalCount: number;
};

export interface HasTimestamp {
  /** Expected to be UTC */
  createdAt?: string;
  /** Expected to be UTC */
  updatedAt?: string;
}
