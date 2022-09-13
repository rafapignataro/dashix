import type { GetServerSideProps, NextPage } from 'next'

import { getServerSession } from '../../utils/getServerSession'

import { CreateUser } from '../../components/modules/users/mutate'
import { serverRedirect } from '../../utils/serverRedirect'

const CreateUserPage: NextPage = () => <CreateUser />

export default CreateUserPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx);

  if(!session || !session.user) return serverRedirect('/login');
  
  if (!['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) return serverRedirect('/');

  return {
    props: {}
  }
}
