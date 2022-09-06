import { GetServerSidePropsContext, PreviewData } from "next";
import { unstable_getServerSession } from "next-auth";
import { ParsedUrlQuery } from "querystring";
import { nextAuthOptions } from "../../pages/api/auth/[...nextauth]"

export const getServerSession = async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const session = await unstable_getServerSession(ctx.req, ctx.res, nextAuthOptions)

  return session
}