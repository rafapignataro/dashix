import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const nextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
    }),
  ],
}

export default NextAuth(nextAuthOptions)