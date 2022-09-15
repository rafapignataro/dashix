import { TRPCError } from "@trpc/server";
import { z } from "zod";

import states from '../data/states.json';

import { createRouter } from "../context";

export const partnerRouter = createRouter()
  .query("findAll", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.partner.findMany();
    },
  })
  .query("findByEmail", {
    input: z.object({
      email: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.partner.findFirst({ where: { email: input.email }});
    },
  })
  .query("findById", {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.partner.findFirst({ where: { id: input.id }});
    },
  })
  .mutation("create", {
    input: z.object({
      name: z.string(),
      email: z.string(),
      ddd: z.string(),
      phone: z.string(),
      address: z.string(),
      city: z.string(),
      stateId: z.string(),
      space: z.string().optional(),
      instagram: z.string().optional(),
    }),
    resolve: async ({ input, ctx }) => {
      const stateExists = states.find(state => state.id === input.stateId)

      if(!stateExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Esse estado não existe.',
        })
      }

      const { name, email, ddd, phone, address, city, stateId, space, instagram } = input;

      return await ctx.prisma.partner.create({
        data: {
          name, 
          email, 
          ddd, 
          phone, 
          address, 
          city, 
          stateId, 
          space, 
          instagram,
          createdAt: new Date().toISOString()
        }
      })
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      ddd: z.string(),
      phone: z.string(),
      address: z.string(),
      city: z.string(),
      stateId: z.string(),
      space: z.string().optional(),
      instagram: z.string().optional(),
    }),
    resolve: async ({ input, ctx }) => {
      const partnerExists = await ctx.prisma.partner.findFirst({
        where: {
          id: input.id
        }
      });

      if(!partnerExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Esse habilitado não existe',
        })
      }

      if (input.stateId !== partnerExists.stateId) {
        const stateExists = states.find(state => state.id === input.stateId)

        if(!stateExists) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Esse estado não existe.',
          })
        }
      }

      const { name, email, ddd, phone, address, city, stateId, space, instagram } = input;

      return await ctx.prisma.partner.update({
        where: {
          id: input.id
        },
        data: {
          name, email, ddd, phone, address, city, stateId, space, instagram
        }
      })
    },
  })

export type PartnerRouter = typeof partnerRouter;