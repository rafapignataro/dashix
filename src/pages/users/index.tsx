import type { GetServerSideProps, NextPage } from 'next'

import { getServerSession } from '../../utils/getServerSession'

import { QueryUsers } from '../../components/modules/Users/query'
import { serverRedirect } from '../../utils/serverRedirect'

const UsersPage: NextPage = () => <QueryUsers />

export default UsersPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx);

  if(!session || !session.user) return serverRedirect('/login');

  if (!['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) return serverRedirect('/');
  console.log('TESTE TESTE TESTE')
  return {
    props: {
      session,
    }
  }
}
