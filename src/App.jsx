import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import EditPage from './components/EditPage';
import { AuthContextProvider } from "./utilities/firebase";

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
    <AuthContextProvider>
      <RouterProvider router={router}/>
    </AuthContextProvider>
  );
}

export default App;
