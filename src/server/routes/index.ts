import { createRouter } from "../context";
import { stateRouter } from "./states";
import { userRouter } from "./users";

export const serverRouter = createRouter()
  .merge('users.', userRouter)
  .merge('states.', stateRouter);

export type ServerRouter = typeof serverRouter;