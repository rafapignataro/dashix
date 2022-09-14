import { TRPCError } from "@trpc/server";
import { z } from "zod";

import states from '../data/states.json';

import { createRouter } from "../context";

export const stateRouter = createRouter()
  .query("findAll", {
    resolve: async () => states,
  })
  .query("findById", {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ input }) => {
      const state = states.find(state => state.id === input.id)

      if(state) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Esse estado não existe.',
        })
      }

      return state;
    },
  })

export type StateRouter = typeof stateRouter;