import type { NextPage } from 'next'

import { UpdatePartner } from '@modules/partners/Update';

const UpdatePartnerPage: NextPage = () => <UpdatePartner />

export default UpdatePartnerPage

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
