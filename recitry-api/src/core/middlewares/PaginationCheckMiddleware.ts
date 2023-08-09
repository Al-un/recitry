import type { WithPagination } from "@al-un/recitry-core/core/base-api.endpoints";
import { randomUUID } from "crypto";
import { RequestHandler } from "express";

type PaginationCheckMiddlewareType = (
  maxLimit?: number
) => RequestHandler<null, unknown, unknown, WithPagination>;

const PaginationCheckMiddleware: PaginationCheckMiddlewareType =
  (maxLimit = 50) =>
  (req, res, next) => {
    const { page, limit } = req.query;
    console.log(`Paginate with ${page} and ${limit}`);

    if (page === null || page === undefined) {
      res.status(400).send({ message: "Pagination page is required" });
      return;
    }

    if (limit === null || limit === undefined) {
      res.status(400).send({ message: "Pagination limit is required" });
      return;
    }

    if (page < 1) {
      res.status(400).send({ message: "Pagination page starts at 1" });
      return;
    }

    if (limit < 1) {
      res
        .status(400)
        .send({ message: `Pagination limit cannot be less than 1` });
      return;
    }

    if (limit > maxLimit) {
      res
        .status(400)
        .send({ message: `Pagination limit cannot be more than ${maxLimit}` });
      return;
    }

    console.log("GO!");
    next();
  };

export default PaginationCheckMiddleware;
