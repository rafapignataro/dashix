import * as trpcNext from "@trpc/server/adapters/next";

import { serverRouter } from "../../../server/routes";
import { createContext } from "../../../server/context";

export default trpcNext.createNextApiHandler({
  router: serverRouter,
  createContext,
});