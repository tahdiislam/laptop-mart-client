import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Shared/Header";

const DashboardLayout = () => {
  return (
    <div>
      <Header />
      <div className="drawer drawer-mobile dra">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-center">
          <div className="w-full flex justify-start p-2">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-circle btn-primary drawer-button lg:hidden"
            >
               <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
            </label>
          </div>
          {/* content */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
