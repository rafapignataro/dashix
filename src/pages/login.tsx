import type { GetServerSideProps, NextPage } from 'next'

import { Login } from '../components/modules/login'
import { getServerSession } from '../utils/getServerSession'

const LoginPage: NextPage = () => <Login />

export default LoginPage

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