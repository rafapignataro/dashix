import { createRouter } from "../context";
import { partnerRouter } from "./partners";
import { stateRouter } from "./states";
import { userRouter } from "./users";

export const serverRouter = createRouter()
  .merge('users.', userRouter)
  .merge('states.', stateRouter)
  .merge('partners.', partnerRouter);

export type ServerRouter = typeof serverRouter;