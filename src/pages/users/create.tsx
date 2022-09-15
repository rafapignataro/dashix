import type { NextPage } from 'next'

import { CreateUser } from '../../components/modules/users/Create'

const CreateUserPage: NextPage = () => <CreateUser />

export default CreateUserPage

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const session = await getServerSession(ctx);

//   if(!session || !session.user) return serverRedirect('/login');
  
//   if (!['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) return serverRedirect('/');

//   return {
//     props: {}
//   }
// }
