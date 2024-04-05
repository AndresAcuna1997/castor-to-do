import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './router/router';

const ToDoApp = () => {
  return (
    <>
      <RouterProvider router={ router } />
      <Toaster />
    </>
  );
};
export default ToDoApp;