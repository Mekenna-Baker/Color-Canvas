import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CanvasPage from './pages/canvasPage.tsx';
import HomePage from './pages/homePage.tsx';
import Error from './pages/errorPage.tsx';
import LoginPage from './pages/loginPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: '/CanvasPage',
        element: <CanvasPage/>,
      },
      {
        path: '/login',  // Add the login route here
        element: <LoginPage />,  // LoginPage component for this path
      },
      
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router}/>)
}