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
  createdAt?: Date;
  updatedAt?: Date;
}
