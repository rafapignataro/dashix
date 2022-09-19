import type { NextPage } from 'next'

import { ShowPartners } from '@modules/partners/Show'

const PartnersPage: NextPage = () => <ShowPartners />

export default PartnersPage

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const session = await getServerSession(ctx);

//   if(!session || !session.user) return serverRedirect('/login');

//   if (!['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) return serverRedirect('/');

//   return {
//     props: {
//       session,
//     }
//   }
// }
