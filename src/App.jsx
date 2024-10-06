import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import EditPage from './components/EditPage';

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <>
      <Banner/>
      <Outlet/>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppContent/>,
    children: [
      {
        path: "/",
        element: <TermPage/>
      },
      {
        path: "/edit/:code",
        element: <EditPage/>
      }
    ]
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  );
}

export default App;
