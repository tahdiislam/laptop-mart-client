import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct";
import MyProduct from "../Pages/Dashboard/Seller/MyProduct";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import RequireAuth from "../PrivateRouter/RequireAuth";
import RequireSeller from "../PrivateRouter/RequireSeller";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <MyProfile />
          </RequireAuth>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <RequireSeller>
            <AddProduct />
          </RequireSeller>
        ),
      },
      {
        path: "/dashboard/my-products",
        element: (
          <RequireSeller>
            <MyProduct/>
          </RequireSeller>
        ),
      },
    ],
  },
]);

export default router;
