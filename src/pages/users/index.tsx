import type { GetServerSideProps, NextPage } from 'next'


import { ShowUsers } from '@modules/users/Show'
import { getServerSession } from '../../utils/getServerSession'
import { serverRedirect } from '../../utils/serverRedirect'

const UsersPage: NextPage = () => <ShowUsers />

export default UsersPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx);

  if(!session || !session.user) return serverRedirect('/login');

  if (!['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) return serverRedirect('/');

  return {
    props: {
      session,
    }
  }
}
