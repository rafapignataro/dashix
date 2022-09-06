import type { GetServerSideProps, NextPage } from 'next'

import { getServerSession } from '../../utils/helpers/getServerSession'

import { ShowUsers } from '../../components/modules/Users'

const UsersPage: NextPage = () => <ShowUsers />

export default UsersPage

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
