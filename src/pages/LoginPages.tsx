import { useNavigate } from 'react-router-dom';
import { LogIn, SignUp } from '../components';
import { useAuthStore } from '../stores/auth/auth.store';

export const LoginPages = () => {

  const createUserGoogle = useAuthStore( ( state ) => state.createUserGoogle );
  const navigate = useNavigate();


  const handleGoogleSignIn = async () => {

    try {
      await createUserGoogle();
      navigate( '/main', { replace: true } );
    } catch ( error ) {
      console.log( error );
    }

  };

  return (
    <main className="bg-blue-600 grid place-items-center h-screen">
      <div className="text-center h-1/2">
        <div className="flex gap-8 h-3/4">
          <LogIn />
          <SignUp />
        </div>

        <button
          className="bg-white p-2 rounded-lg m-auto mt-4 flex items-center gap-2"
          onClick={ handleGoogleSignIn }
        >
          <i className="fab fa-google"></i>
          Sign In with Google
        </button>
      </div>
    </main>
  );
};