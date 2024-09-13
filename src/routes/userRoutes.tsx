import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/landing';


const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <HomePage/>,
    },
  ]);

export default appRouter;
