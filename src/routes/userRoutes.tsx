import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/Landing/landing';
import LoginPage from '@/pages/Landing/Login/Login';
import SignUpPage from '@/pages/signup';


const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <HomePage/>,
    },
    {
      path:'/login',
      element:<LoginPage/>
    },
    {
      path:'/signup',
      element:<SignUpPage/>
    }
  ]);

export default appRouter;
