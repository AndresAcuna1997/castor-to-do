import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth } from "../firebase";

export class AuthService {
  static createUserWithEmailPassword = async ( email: string, password: string ) => {
    try {
      const user = await createUserWithEmailAndPassword( auth, email, password );
      return user;
    } catch ( error ) {
      throw new Error( "Error creating user" );
    }
  };

  static createUserGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup( auth, provider );
      return user;
    } catch ( error ) {
      throw new Error( "Error creating user" );
    }
  };

  static loginUserEmailPassword = async ( email: string, password: string ) => {
    try {
      const user = await signInWithEmailAndPassword( auth, email, password );
      return user;
    } catch ( error ) {
      throw new Error( "Error logging in user" );
    }
  };

  static logoutUser = async () => {
    try {
      await signOut( auth );
    } catch ( error ) {
      throw new Error( "Error logging out user" );
    }
  };
}