import type { GetServerSideProps, NextPage } from 'next'

import { NotFound } from '@modules/notfound'
import { getServerSession } from '../utils/getServerSession'

const NotFoundPage: NextPage = () => <NotFound />

export default NotFoundPage