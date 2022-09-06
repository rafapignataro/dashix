import type { GetServerSideProps, NextPage } from 'next'

import { Home } from '../components/modules/home'
import { getServerSession } from '../utils/helpers/getServerSession'

const HomePage: NextPage = () => <Home />

export default HomePage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx);

  if(!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
      props: {}
    }
  }

  return {
    props: {
      session,
    }
  }
}