import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from 'next-auth/providers/email';
import sendgridMailer from '@sendgrid/mail';

sendgridMailer.setApiKey(String(process.env.SMTP_PASSWORD));

import { prisma } from "@providers/prisma";
import { emailFrom, emailServer } from "@providers/sendgrid";
import { templateProvider } from "@providers/templateProvider";
import { supabase } from "@providers/supabase";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: emailServer,
      from: emailFrom,
      sendVerificationRequest: async ({
        identifier,
        url,
      }) => {
        try {
          const emailVerificationTemplate  = await supabase.storage.from('dashix').download('templates/emailVerification.hbs')

          if(!emailVerificationTemplate.data || emailVerificationTemplate.error) throw emailVerificationTemplate.error;

          const templateHTML = await emailVerificationTemplate.data.text();

          const html = await templateProvider(templateHTML, {
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