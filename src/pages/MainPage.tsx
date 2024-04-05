import { useEffect, useState } from 'react';
import { EditToDo, ToDoItem, NavBar, Loading } from '../components';
import { useForm } from '../hooks';
import { useToDoStore } from '../stores/toDo/toDo.store';
import { useDialog } from '../hooks/useDialog';
import { toast } from 'sonner';

const INITIAL_STATE = {
  toDoTitle: '',
  toDoDescription: '',
};

export const MainPage = () => {

  const [ filter, setFilter ] = useState( 'all' );

  const { dialogRef, toogleDialog } = useDialog();
  const { handleChange, valueForm, resetForm } = useForm( INITIAL_STATE );
  const toDoList = useToDoStore( ( state ) => state.toDoList );
  const isLoading = useToDoStore( ( state ) => state.isLoading );
  const addToDo = useToDoStore( ( state ) => state.addToDo );
  const getToDos = useToDoStore( ( state ) => state.getToDos );
  const filterToDosByStatus = useToDoStore( ( state ) => state.filterToDosByStatus );

  const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {

    event.preventDefault();
    const { toDoTitle, toDoDescription } = valueForm;
    try {
      await addToDo( toDoTitle, toDoDescription );
      toast.success( 'To-Do added' );
      resetForm();
    } catch ( error ) {
      toast.error( 'Error adding To-Do' );
    }

  };

  const fetchToDos = async () => {
    try {
      await getToDos();
    } catch ( error ) {
      toast.error( 'Error getting To-Dos' );
    }
  };


  useEffect( () => {
    fetchToDos();
  }, [] );

  useEffect( () => {
    filterToDosByStatus( filter );
  }, [ filter, filterToDosByStatus ] );

  return (
    <>
      <NavBar />

      <dialog ref={ dialogRef }>
        <EditToDo toogleDialog={ toogleDialog } />
      </dialog>

      <main className="flex flex-col items-center pt-9 h-screen bg-slate-200">
        <form onSubmit={ handleSubmit } className="mb-4">
          <input
            type="text"
            value={ valueForm.toDoTitle }
            onChange={ handleChange }
            name="toDoTitle"
            placeholder="Title"
            className="border border-gray-300 rounded px-4 py-2 mr-2"
          />
          <input
            type="text"
            value={ valueForm.toDoDescription }
            onChange={ handleChange }
            name="toDoDescription"
            placeholder="Description"
            className="border border-gray-300 rounded px-4 py-2 mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </form>

        <div className="flex">
          <h2 className="text-2xl font-semibold">Filtrer by: </h2>
          <select
            name="status"
            className="border border-gray-300 rounded px-4 py-2 mr-2 ml-2 mb-6"
            onChange={ ( e ) => setFilter( e.target.value ) }
            value={ filter }
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {
          isLoading ? ( <Loading /> ) : (
            <div className="grid grid-cols-5 gap-3">
              {
                toDoList.map( ( { id, description, title, creationDate, status } ) => (
                  <ToDoItem
                    key={ id }
                    id={ id }
                    title={ title }
                    status={ status }
                    description={ description }
                    date={ creationDate }
                    toogleDialog={ toogleDialog }
                  />
                ) )
              }
            </div> )
        }

      </main>
    </>
  );
};