import type { NextPage } from 'next'


import { UpdateUser } from '../../components/modules/users/Update';


const UpdateUserPage: NextPage = () => <UpdateUser />

export default UpdateUserPage

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const session = await getServerSession(ctx);

//   if(!session || !session.user) return serverRedirect('/login')

//   if (!['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) return serverRedirect('/');

//   const { id } = ctx.query;

//   return {
//     props: {
//       session,
//       id
//     }
//   }
// }
