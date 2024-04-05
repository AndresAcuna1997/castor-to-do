import { useAuthStore } from '../../stores/auth/auth.store';
export const NavBar = () => {

  const logoutUser = useAuthStore( ( state ) => state.logoutUser );
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch ( error ) {
      throw new Error( 'Error Sign out' );
    }
  };

  return (
    <header className="w-full bg-blue-500 ">
      <nav className="flex items-center justify-between px-4 h-14">
        <h1 className="font-bold text-white text-2xl">
          TO-DO APP
        </h1>

        <button
          onClick={ handleLogout }
          className="bg-white p-2 rounded">
          <i className="fas fa-sign-out-alt"></i> Log Out
        </button>
      </nav>
    </header>
  );
};