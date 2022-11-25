import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Loading from "../Component/Spinner/Loading";
import { UserContext } from "../Context/AuthProvider";
import useSeller from "../Hooks/useSeller";
import Header from "../Shared/Header";

const DashboardLayout = () => {
  const { user, loading: userLoading } = useContext(UserContext);

  const { isSeller, loading } = useSeller(user?.email);

  if (userLoading) {
    return <Loading classes="mt-6" size="h-8 w-8" />;
  }
  return (
    <div>
      <Header />
      <div className="drawer drawer-mobile drawer-end">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="w-full flex justify-start p-2">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-circle btn-primary drawer-button lg:hidden"
            >
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
            </label>
          </div>
          {/* content */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <Link to="/dashboard">My Profile</Link>
            </li>
            {!loading ? (
              <>
                {isSeller && (
                  <>
                    <li>
                      <Link to="/dashboard/add-product">Add Product</Link>
                      <Link to="/dashboard/my-products">My Products</Link>
                      <Link to="/dashboard/my-buyers">My Buyers</Link>
                    </li>
                  </>
                )}
              </>
            ) : (
              <Loading size="w-6 h-6" />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
