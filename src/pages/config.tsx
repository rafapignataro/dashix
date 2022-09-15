import type { NextPage } from 'next'

import { Config } from '../components/modules/config'

const ConfigPage: NextPage = () => <Config />

export default ConfigPage

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const session = await getServerSession(ctx);

//   if(!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//       props: {}
//     }
//   }

//   return {
//     props: {
//       session,
//     }
//   }
// }
