import type { GetServerSideProps, NextPage } from 'next'

import { getServerSession } from '../../utils/getServerSession'

import { CreatePartner } from '../../components/modules/partners/Create'
import { serverRedirect } from '../../utils/serverRedirect'

const CreatePartnerPage: NextPage = () => <CreatePartner />

export default CreatePartnerPage

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const session = await getServerSession(ctx);

//   if(!session || !session.user) return serverRedirect('/login');
  
//   if (!['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) return serverRedirect('/');

//   return {
//     props: {}
//   }
// }
