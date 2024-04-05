import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthService } from '../../services/auth.service';
import { UserCredential } from 'firebase/auth';

export interface AuthState {
  user: UserCredential | null;
  createUserEmailPassword: ( email: string, password: string ) => Promise<void>;
  createUserGoogle: () => Promise<void>;
  loginUserEmailPassword: ( email: string, password: string ) => Promise<void>;
  logoutUser: () => Promise<void>;
}

const storeApi: StateCreator<AuthState> = ( set ) => ( {
  user: null,
  createUserEmailPassword: async ( email: string, password: string ) => {
    try {
      const user = await AuthService.createUserWithEmailPassword( email, password );
      set( { user } );
    } catch ( error ) {
      throw new Error( "Error creating user" );
    }
  },
  createUserGoogle: async () => {
    try {
      const user = await AuthService.createUserGoogle();
      set( { user } );
    } catch ( error ) {
      throw new Error( "Error creating user" );
    }
  },
  loginUserEmailPassword: async ( email: string, password: string ) => {
    try {
      const user = await AuthService.loginUserEmailPassword( email, password );
      set( { user } );
    } catch ( error ) {
      throw new Error( "Error logging in user" );
    }
  },
  logoutUser: async () => {
    try {
      await AuthService.logoutUser();
      set( { user: null } );
    } catch ( error ) {
      throw new Error( "Error logging out user" );
    }
  }
} );

export const useAuthStore = create<AuthState>()( devtools( storeApi ) );