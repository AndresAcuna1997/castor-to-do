import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ToDoService } from '../../services/toDo.service';
import { ToDo } from '../../interfaces';

export interface ToDoState {
  toDoList: ToDo[];
  selectedStatus: string,
  isLoading: boolean;
  beginEditToDo: ToDo,
  addToDo: ( title: string, description: string ) => Promise<void>;
  getToDos: () => Promise<void>;
  deleteToDo: ( toDo: string ) => Promise<void>;
  filterToDosByStatus: ( status: string ) => Promise<void>;
  updateToDo: ( id: string, status?: string, title?: string, description?: string ) => Promise<void>;
  setbeginEditToDo: ( toDo: ToDo ) => void;
}

const storeApi: StateCreator<ToDoState> = ( set, get ) => ( {
  toDoList: [],
  isLoading: false,
  selectedStatus: 'all',
  beginEditToDo: { id: '1', title: '1', description: '', status: '', date: '' },
  getToDos: async () => {
    try {
      set( { isLoading: true } );
      const toDoList = await ToDoService.getToDos();
      set( { toDoList } );
    } catch ( error ) {
      set( { toDoList: [] } );
      throw new Error( "Error getting documents" );
    } finally {
      set( { isLoading: false } );
    }

  },
  filterToDosByStatus: async ( status: string ) => {
    try {
      if ( status === 'all' ) {
        set( { selectedStatus: 'all' } );
        await get().getToDos();
        return;
      }

      set( { isLoading: true } );
      set( { selectedStatus: status } );
      const toDoList = await ToDoService.geToDosByStatus( status );
      set( { toDoList } );
    } catch ( error ) {
      throw new Error( "Error getting documents" );
    } finally {
      set( { isLoading: false } );
    }

  },
  addToDo: async ( title: string, description: string ) => {
    try {
      set( { isLoading: true } );
      const toDoList = await ToDoService.addToDo( title, description );
      set( { toDoList } );
    } catch ( error ) {
      throw new Error( "Error adding document" );
    } finally {
      set( { isLoading: false } );
    }
  },
  deleteToDo: async ( id: string ) => {
    try {
      set( { isLoading: true } );
      const toDoList = await ToDoService.deleteToDo( id );
      set( { toDoList } );
    } catch ( error ) {
      throw new Error( "Error deleting document" );
    } finally {
      set( { isLoading: false } );
    }
  },
  updateToDo: async ( id: string, status?: string, title?: string, description?: string ) => {
    try {
      set( { isLoading: true } );
      const toDoList = await ToDoService.updateToDo( id, status, title, description );
      set( { toDoList } );
    } catch ( error ) {
      throw new Error( "Error updating document" );
    } finally {
      set( { isLoading: false } );
    }
  },
  setbeginEditToDo: ( toDo: ToDo ) => {
    set( { beginEditToDo: toDo } );
  }
} );

export const useToDoStore = create<ToDoState>()( devtools( storeApi ) );