import type { GetServerSideProps, NextPage } from 'next'

import { Config } from '@modules/config'
import { getServerSession } from '@utils/getServerSession'

const ConfigPage: NextPage = () => <Config />

export default ConfigPage

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
