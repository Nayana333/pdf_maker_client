import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/Landing/landing';
import LoginPage from '@/pages/Login/Login';
import SignUpPage from '@/pages/signup';
import OtpVerify from '@/pages/otpVerify';


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
    },
    {
      path:'/otp',
      element:<OtpVerify/>
    }
  ]);

export default appRouter;
