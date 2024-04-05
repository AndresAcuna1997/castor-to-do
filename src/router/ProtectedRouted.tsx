import { useAuthStore } from '../stores/auth/auth.store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ProtectedRouted = ( { children }: Props ) => {

  const navigate = useNavigate();
  const user = useAuthStore( ( state ) => state.user );

  useEffect( () => {
    if ( !user ) {
      navigate( '/login', { replace: true });
    }
  }, [ user, navigate ] );

  return (
    <>
      { children }
    </>
  );
};