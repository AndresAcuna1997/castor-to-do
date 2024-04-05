import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks';
import { useAuthStore } from '../../stores/auth/auth.store';
import { useState } from 'react';

const INITIAL_FORM_VALUES = {
  email: '',
  password: '',
};

export const SignUp = () => {

  const [ error, setError ] = useState( '' );
  const { valueForm, handleChange } = useForm( INITIAL_FORM_VALUES );
  const createUserEmailPassword = useAuthStore( ( state ) => state.createUserEmailPassword );
  const navigate = useNavigate();

  const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    try {
      setError( '' );
      await createUserEmailPassword( valueForm.email, valueForm.password );
      navigate( '/main', { replace: true } );
    } catch ( error ) {
      //@ts-expect-error error object will always have a message property in this context
      setError( error.message );
    }
  };

  return (
    <div className="bg-white shadow rounded-md p-4 h-fit">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      <form className="flex flex-col" onSubmit={ handleSubmit }>
        <label htmlFor="email" className=" font-semibold mb-2">
          Email
        </label>
        <input
          value={ valueForm.email }
          onChange={ handleChange }
          type="email"
          name="email"
          className="border border-gray-300 rounded-md p-2 mb-4"
        />

        <label htmlFor="password" className=" font-semibold mb-2">
          Password
        </label>
        <input
          value={ valueForm.password }
          onChange={ handleChange }
          type="password"
          name="password"
          className="border border-gray-300 rounded-md p-2 mb-4"
        />

        <button className="bg-blue-500 text-white p-2 rounded-lg m-auto" type="submit">
          Sign Up
        </button>

        { error && <p className="text-red-500 bg-red-200 border border-red-500 rounded p-2 text-center mt-4">{ error }</p> }
      </form>
    </div>
  );
};