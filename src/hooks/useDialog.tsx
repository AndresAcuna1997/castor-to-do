import { useRef } from 'react';

export const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>( null );

  const toogleDialog = () => {
    if ( !dialogRef.current ) {
      return;
    }
    dialogRef.current.hasAttribute( 'open' ) ? dialogRef.current.close() : dialogRef.current.showModal();
  };

  return {
    dialogRef,
    toogleDialog,
  };
};