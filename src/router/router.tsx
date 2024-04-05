import { Navigate, createBrowserRouter } from 'react-router-dom';
import { LoginPages, MainPage } from '../pages';
import { ProtectedRouted } from './ProtectedRouted';

export const router = createBrowserRouter( [
  {
    path: '/login',
    element: <LoginPages />
  },
  {
    path: '/main',
    element: <ProtectedRouted><MainPage /></ProtectedRouted>
  },
  {
    path: '*',
    element: <Navigate to="/main" />
  }

] );