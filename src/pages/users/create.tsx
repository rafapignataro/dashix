import type { GetServerSideProps, NextPage } from 'next'

import { getServerSession } from '../../utils/helpers/getServerSession'

import { CreateUser } from '../../components/modules/Users'

const CreateUserPage: NextPage = () => <CreateUser />

export default CreateUserPage

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
