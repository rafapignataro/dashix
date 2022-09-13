import { createRouter } from "../context";
import { userRouter } from "./users";

export const serverRouter = createRouter()
  .merge('users.', userRouter);

export type ServerRouter = typeof serverRouter;