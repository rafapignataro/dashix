import type { NextPage } from 'next'

import { Logout } from '../components/modules/logout'

const LogoutPage: NextPage = () => <Logout />

export default LogoutPage

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const session = await getServerSession(ctx);

//   if(session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//       props: {
//         session
//       }
//     }
//   }

//   return {
//     props: { }
//   }
// }