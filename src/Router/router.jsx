import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import SingleBrand from "../Pages/Brands/SingleBrand";
import AdminAction from "../Pages/Dashboard/Admin/AdminAction";
import AllBuyers from "../Pages/Dashboard/Admin/AllBuyers";
import AllSeller from "../Pages/Dashboard/Admin/AllSeller";
import ReportedProduct from "../Pages/Dashboard/Admin/ReportedProduct";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import Payment from "../Pages/Dashboard/Payment.jsx/Payment";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct";
import MyProduct from "../Pages/Dashboard/Seller/MyProduct";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import MyOrders from "../Pages/MyOrders/MyOrders";
import Register from "../Pages/Register/Register";
import RequireAdmin from "../PrivateRouter/RequireAdmin";
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
      {
        path: "/category/:id",
        element: (
          <RequireAuth>
            <SingleBrand />
          </RequireAuth>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_server_url}brand/${params.id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("lmt")}`,
            },
          }),
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
        path: "/dashboard/my-orders",
        element: (
          <RequireAuth>
            <MyOrders />
          </RequireAuth>
        ),
      },
      {
        path: "/dashboard/my-orders/payment/:id",
        element: (
          <RequireAuth>
            <Payment />
          </RequireAuth>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_server_url}bookings/${params.id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("lmt")}`,
            },
          }),
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
            <MyProduct />
          </RequireSeller>
        ),
      },
      {
        path: "/dashboard/all-sellers",
        element: (
          <RequireAdmin>
            <AllSeller />
          </RequireAdmin>
        ),
      },
      {
        path: "/dashboard/all-buyers",
        element: (
          <RequireAdmin>
            <AllBuyers />
          </RequireAdmin>
        ),
      },
      {
        path: "/dashboard/admin-action",
        element: (
          <RequireAdmin>
            <AdminAction />
          </RequireAdmin>
        ),
      },
      {
        path: "/dashboard/reported-product",
        element: (
          <RequireAdmin>
            <ReportedProduct />
          </RequireAdmin>
        ),
      },
    ],
  },
]);

export default router;
