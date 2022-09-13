import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';


type CartContextProps = {
  loading: boolean;
  user: Session['user'] | null
}

type UserProviderProps = {
  children: React.ReactNode;
}

const CartContext = createContext({} as CartContextProps);

export default function UserProvider({ children }: UserProviderProps) {
  const { data: session } = useSession();

  let user = null;

  const resolved = session && session.user;

  if (resolved) user = session.user;

	return (
		<CartContext.Provider value={{ loading: !resolved, user }}>
			{children}
		</CartContext.Provider>
	);
}

export function useUser() {
	const context = useContext(CartContext);

	if (!context) throw new Error('useUser must me used inside an UserProvider.');

	return context;
}