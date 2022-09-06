import type { GetServerSideProps, NextPage } from 'next'

import { getServerSession } from '../../utils/helpers/getServerSession'

import { UpdateUser } from '../../components/modules/Users/Update';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  permission: string;
}


type UpdateUserPageProps = {
  user: User;
}

const UpdateUserPage: NextPage<UpdateUserPageProps> = ({ user }: UpdateUserPageProps) => <UpdateUser user={user}/>

export default UpdateUserPage

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

  const { id } = ctx.query;

  return {
    props: {
      session,
      user: {
        id,
        name: 'Rafael Mira Pignataro',
        email: 'rafapignataro@gmail.com',
        createdAt: '18:47 04/09/2022',
        permission: 'admin',
      },
    }
  }
}
