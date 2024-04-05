import { useState } from 'react';
import { useToDoStore } from '../../stores/toDo/toDo.store';

interface Props {
  id: string;
  title: string;
  status: string;
  description: string;
  date: string;
  toogleDialog: () => void;
}

export const ToDoItem = ( { id, status, title, date, description, toogleDialog }: Props ) => {
  const [ checkStatus, setcheckStatus ] = useState( status );
  const deleteToDo = useToDoStore( ( state ) => state.deleteToDo );
  const changeToDoStatus = useToDoStore( ( state ) => state.updateToDo );
  const setbeginEditToDo = useToDoStore( ( state ) => state.setbeginEditToDo );

  const handleEdit = () => {

    setbeginEditToDo( {
      id,
      status: checkStatus,
      title,
      description,
      date,
    } );

    toogleDialog();
  };

  const handleDelete = () => {
    deleteToDo( id );
  };

  const handleCheckboxChange = () => {
    setcheckStatus( ( prev ) => {
      let newStatus;
      if ( prev === 'completed' ) {
        newStatus = 'pending';
      } else {
        newStatus = 'completed';
      }
      changeToDoStatus( id, newStatus );
      return newStatus;
    } );
  };

  return (
    <div className={ `${ checkStatus === 'completed' ? 'bg-green-400' : 'bg-yellow-400' } w-64 min-h-64 flex flex-col justify-between  rounded-lg border  mb-6 py-5 px-4` }>
      <div>
        <h4 className="text-gray-800 font-bold text-lg mb-1">{ title }</h4>
        <label className="text-gray-800 font-semibold text-sm mb-3">
          <input
            type="checkbox"
            checked={ checkStatus === 'completed' }
            onChange={ handleCheckboxChange }
          />
          <span className="ml-1 font-semibold">
            { status.toUpperCase() }
          </span>
        </label>
        <hr className="my-2 border-black" />
        <p className="text-gray-800 text-sm">{ description }</p>
      </div>
      <div>
        <div className="flex gap-2 items-center justify-between text-gray-800">
          <p className="text-sm">{ date }</p>
          <div className="flex gap-2">
            <button
              onClick={ () => handleEdit() }
              className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
              aria-label="edit note"
              role="button"
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              onClick={ () => handleDelete() }
              className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
              aria-label="edit note"
              role="button"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
