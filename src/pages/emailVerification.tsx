import type { GetServerSideProps, NextPage } from 'next'

import { EmailVerification } from '../components/modules/emailVerification'
import { getServerSession } from '../utils/getServerSession'

const emailVerificationPage: NextPage = () => <EmailVerification />

export default emailVerificationPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx);

  if(session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {
        session
      }
    }
  }

  return {
    props: { }
  }
}