import type { NextPage } from 'next'

import { EmailVerification } from '@modules/emailVerification'

const emailVerificationPage: NextPage = () => <EmailVerification />

export default emailVerificationPage

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