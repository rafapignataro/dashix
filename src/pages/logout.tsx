import type { GetServerSideProps, NextPage } from 'next'

import { Logout } from '../components/modules/logout'
import { getServerSession } from '../utils/getServerSession'

const LogoutPage: NextPage = () => <Logout />

export default LogoutPage

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