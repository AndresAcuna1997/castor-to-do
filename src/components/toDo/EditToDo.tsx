import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useToDoStore } from '../../stores/toDo/toDo.store';
import { useForm } from '../../hooks';

interface Props {
  toogleDialog: () => void;
}

export const EditToDo = ( { toogleDialog }: Props ) => {


  const [ select, setSelect ] = useState( '' );
  const beginEditToDo = useToDoStore( ( state ) => state.beginEditToDo );
  const updateToDo = useToDoStore( ( state ) => state.updateToDo );
  const { handleChange, setNewValueForm, valueForm } = useForm( beginEditToDo );

  const handleSubmit = async ( e ) => {
    e.preventDefault();

    const { id, status, title, description } = valueForm;

    try {
      await updateToDo( id, status, title, description );
      toogleDialog();

      toast.success( 'To-Do Edited' );

    } catch ( error ) {

      toast.error( "Error updating document" );
    }
  };

  const handleSelectChange = ( e ) => {
    setNewValueForm( ( prev ) => {
      setSelect( e.target.value );
      return { ...prev, status: e.target.value };
    } );

  };

  useEffect( () => {
    setNewValueForm( { ...beginEditToDo } );
    setSelect( beginEditToDo.status );
  }, [ beginEditToDo ] );

  return (
    <div className="bg-white p-3 rounded border-2 border-gray-600">
      <h2>Edit To-Do</h2>

      <form onSubmit={ handleSubmit }>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            onChange={ handleChange }
            name="title"
            value={ valueForm.title }
            type="text" id="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <input
            onChange={ handleChange }
            name="description"
            value={ valueForm.description }
            id="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status</label>
          <select
            name="status"
            value={ select }
            onChange={ handleSelectChange }
            id="status"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </form >

      <button
        onClick={ toogleDialog }
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
      >
        Close
      </button>

      <button
        onClick={ handleSubmit }
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-3"
        type="submit"
      >
        Save
      </button>


    </div >
  );
};
