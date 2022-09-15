import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext } from 'react';

import { Loading } from '@common/Loading';


type CartContextProps = {
  user: Session['user'] | null
}

type UserProviderProps = {
  children: React.ReactNode;
}

const CartContext = createContext({} as CartContextProps);

export default function UserProvider({ children }: UserProviderProps) {
  const { data: session } = useSession();

  if (!session || !session.user) return <Loading minH="100vh" />;

	return (
		<CartContext.Provider value={{ user: session.user }}>
			{children}
		</CartContext.Provider>
	);
}

export function useUser() {
	const context = useContext(CartContext);

	if (!context) throw new Error('useUser must me used inside an UserProvider.');

	return context;
}