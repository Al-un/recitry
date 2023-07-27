// https://stackoverflow.com/a/47448486/4906586
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-serve-static-core/index.d.ts#L15-L23

import { User } from "./um/models/User";

declare global {
  namespace Express {
    interface User {
      /** The authenticated User ID */
      id: number;
      // For passport middleware
      /** The authentication token used in the request */
      token: string;
    }

    interface Locals{}
  }
}

export {};
