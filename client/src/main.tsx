import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CanvasPage from './pages/canvasPage.tsx';
import HomePage from './pages/homePage.tsx';
import LoginPage from './pages/loginPage.tsx';
import CreateAccount from './pages/createAccountPage.tsx';
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
        path: '/canvasPage',
        element: <CanvasPage/>,

      },

      {
        path: '/login',
        element: <LoginPage/>
      },

      {
        path: '/createAccount',
        element: <CreateAccount/>
      }

    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router}/>)
}
