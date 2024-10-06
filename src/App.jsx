import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import EditPage from './components/EditPage';

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
    <RouterProvider router={router}/>
  );
}

export default App;
