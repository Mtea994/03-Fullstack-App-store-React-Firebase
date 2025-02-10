import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import AdminLayout from "../layout/AdminLayout";
import AdminHome from "../pages/admin/AdminHome";
import UserProfle from "../pages/UserProfle";
import AuthLayout from "../layout/AuthLayout";
import Authentication from "../pages/Authentication";
// import { useEffect } from "react";
// import { auth } from "../config/firebase.config";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { ToastContainer } from "react-toastify";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminApps from "../pages/admin/AdminApps";

export const queryClient = new QueryClient();

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
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "apps",
        element: <AdminApps />,
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
  // useEffect(() => {

  //   return () => unsubscribe();
  // }, [auth]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" theme="dark" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
