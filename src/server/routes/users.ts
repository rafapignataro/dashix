import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createRouter } from "../context";

export const userRouter = createRouter()
  .query("findAll", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.user.findMany();
    },
  })
  .query("findByEmail", {
    input: z.object({
      email: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.user.findFirst({ where: { email: input.email }});
    },
  })
  .query("findById", {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.user.findFirst({ where: { id: input.id }});
    },
  })
  .mutation("create", {
    input: z.object({
      name: z.string(),
      email: z.string(),
      role: z.enum(['SUPER_ADMIN', 'ADMIN', 'USER']),
    }),
    resolve: async ({ input, ctx }) => {
      const userExists = await ctx.prisma.user.findFirst({
        where: {
          email: input.email
        }
      });

      if(userExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Já existe um usuário com esse email.',
          // optional: pass the original error to retain stack trace
          cause: 'Email já existe',
        })
      }
      
      console.log(input)
      return await ctx.prisma.user.create({
        data: { name: input.name, email: input.email, role: input.role },
      });
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      role: z.enum(['SUPER_ADMIN', 'ADMIN', 'USER']),
    }),
    resolve: async ({ input, ctx }) => {
      const userExists = await ctx.prisma.user.findFirst({
        where: {
          id: input.id
        }
      });

      if(!userExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Esse usuário não existe',
        })
      }

      const emailAlreadyExists = await ctx.prisma.user.findFirst({
        where: {
          email: input.email
        }
      });

      if(emailAlreadyExists && emailAlreadyExists.id !== userExists.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Esse email ja está sendo utilizado',
        })
      }

      return await ctx.prisma.user.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
          email: input.email,
          role: input.role
        }
      })
    },
  })

export type UserRouter = typeof userRouter;