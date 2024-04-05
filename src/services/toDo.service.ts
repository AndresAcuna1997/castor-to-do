import { collection, addDoc, getDocs, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { ToDo } from '../interfaces';

export class ToDoService {
  static getToDos = async () => {
    try {
      const todos: ToDo[] = [];
      const querySnapshot = await getDocs( collection( db, "ToDos" ) );
      querySnapshot.forEach( ( doc ) => {
        todos.push( {
          id: doc.id,
          ...doc.data()
        } );
      } );
      return todos;
    } catch ( error ) {
      throw new Error( "Error getting documents" );
    }
  };
  static geToDosByStatus = async ( status: string ) => {

    try {
      const todos: ToDo[] = [];
      const q = query( collection( db, "ToDos" ), where( "status", "==", status ) );

      const querySnapshot = await getDocs( q );
      querySnapshot.forEach( ( doc ) => {
        todos.push( {
          id: doc.id,
          ...doc.data()
        } );
      } );

      return todos;
    } catch ( error ) {
      throw new Error( "Error getting documents" );
    }

  };

  static addToDo = async ( title: string, description: string ) => {
    const dateTime = new Date().toISOString();
    const creationDate = dateTime.split('T')[0];
    const newToDo = { title, description, status: 'pending', creationDate };
    try {
      await addDoc( collection( db, "ToDos" ), newToDo );

      const toDoList = await this.getToDos();

      return toDoList;
    } catch ( error ) {
      throw new Error( "Error adding document" );
    }
  };

  static deleteToDo = async ( id: string ) => {
    try {
      await deleteDoc( doc( db, "ToDos", id ) );

      const toDoList = await this.getToDos();

      return toDoList;
    } catch ( error ) {
      throw new Error( "Error deleting document" );
    }
  };

  static updateToDo = async ( id: string, status?: string, title?: string, description?: string ) => {
    try {
      const docRef = doc( db, "ToDos", id );

      let updatedToDo = {};

      if ( status ) {
        updatedToDo = { status };
      }

      if ( title ) {
        updatedToDo = { ...updatedToDo, title };
      }

      if ( description ) {
        updatedToDo = { ...updatedToDo, description };
      }

      await updateDoc( docRef, updatedToDo );

      const toDoList = await this.getToDos();

      return toDoList;
    } catch ( error ) {
      throw new Error( "Error updating document" );
    }
  };
}