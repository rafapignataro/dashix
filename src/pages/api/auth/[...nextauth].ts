import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from 'next-auth/providers/email';
import sendgridMailer from '@sendgrid/mail';
import getConfig from 'next/config'
import path from 'path';

sendgridMailer.setApiKey(String(process.env.SMTP_PASSWORD));

import { prisma } from "../../../providers/prisma";
import { emailFrom, emailServer } from "../../../providers/sendgrid";
import { templateProvider } from "../../../providers/templateProvider";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
    }),
    EmailProvider({
      server: emailServer,
      from: emailFrom,
      sendVerificationRequest: async ({
        identifier,
        url,
      }) => {
        try {
          const { serverRuntimeConfig } = getConfig()

          const templatePath = path.join(serverRuntimeConfig.PROJECT_ROOT, 'src', 'providers', 'templateProvider', 'templates', 'emailVerification.hbs');
          const html = await templateProvider(templatePath, {
            redirectUrl: url
          });

          await sendgridMailer.send({
            to: identifier,
            from: 'rafapignataro@gmail.com',
            subject: 'Dashix: Faça o Log In',
            html,
          });
        } catch (err: any) {
          console.log(err)
          throw new Error('EMAIL_VERIFICATION_REQUEST_ERROR', err);
        }
      }
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ user, session }) => ({
      ...session,
      user: {
        ...session.user,
        role: user.role
      }
    }),
    signIn: async (params) => {
      const user = await prisma.user.findFirst({ where: { email: String(params.user.email) }});

      if(!user) return false;

      return true;
    }
  },
  events: {
    linkAccount: (message) => {
      console.log(message)
    },
    signIn: (message) => {
      console.log(message)
    },
    createUser: (message) => {
      console.log(message)
    }
  },
  pages: {
    verifyRequest: '/emailVerification',
    error: '/login',
    signOut: '/logout'
  }
}

export default NextAuth(nextAuthOptions)