// https://stackoverflow.com/a/47448486/4906586
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-serve-static-core/index.d.ts#L15-L23

import { User } from "./um/models/User";

declare global {
  namespace Express {
    export interface User {
      userId: number;
      token: string;
    }

    export interface Request {
      user?: User;
      token?: string;
    }
  }
}

export {};
