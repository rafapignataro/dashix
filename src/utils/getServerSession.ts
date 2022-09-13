import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, PreviewData } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { ParsedUrlQuery } from "querystring";
import { nextAuthOptions } from "../pages/api/auth/[...nextauth]"

type CustomSession = Session & { user: Session['user'] & { role: 'SUPER_ADMIN' | 'ADMIN' | 'USER' } }

export const getServerSession = async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const session = await unstable_getServerSession(ctx.req, ctx.res, nextAuthOptions)

  if(!session || !session.user) return null;

  return session;
}

export const getApiSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions)

  if(!session || !session.user) return null;

  return session;
}