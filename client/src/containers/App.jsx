import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import AdminLayout from "../layout/AdminLayout";
import AdminHome from "../pages/admin/AdminHome";
import UserProfle from "../pages/UserProfle";
import AdminUser from "../pages/admin/adminUser";
import AuthLayout from "../layout/AuthLayout";
import Authentication from "../pages/Authentication";
import { useEffect } from "react";
import { auth } from "../config/firebase.config";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/profile/:id",
        element: <UserProfle />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHome /> },
      {
        path: "user",
        element: <AdminUser />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Authentication />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);
        });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return <RouterProvider router={router} />;
}

export default App;
