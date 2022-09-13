import type { GetServerSideProps, NextPage } from 'next'

import { getServerSession } from '../../utils/getServerSession'

import { UpdateUser } from '../../components/modules/Users/mutate';
import { serverRedirect } from '../../utils/serverRedirect';

type UpdateUserPageProps = {
  id: string;
}

const UpdateUserPage: NextPage<UpdateUserPageProps> = ({ id }: UpdateUserPageProps) => <UpdateUser id={id} />

export default UpdateUserPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx);

  if(!session || !session.user) return serverRedirect('/login')

  if (!['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) return serverRedirect('/');

  const { id } = ctx.query;

  return {
    props: {
      session,
      id
    }
  }
}
