import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

const ToDoApp = () => {
  return (
    <RouterProvider router={ router } />
  )
}
export default ToDoApp