import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect } from 'react';

import { Loading } from '@common/Loading';
import { useRouter } from 'next/router';

type CartContextProps = {
  user: Session['user'] | null;
}

type UserProviderProps = {
  children: React.ReactNode;
}

const UserContext = createContext({} as CartContextProps);

export default function UserProvider({ children }: UserProviderProps) {
  const { data: session } = useSession();

  if ((!session || !session.user)) return <Loading minH="100vh" />;

	return (
		<UserContext.Provider value={{ user: session.user }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	const context = useContext(UserContext);

	if (!context) throw new Error('useUser must me used inside an UserProvider.');

	return context;
}