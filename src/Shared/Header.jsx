import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/AuthProvider";

const Header = () => {
  const { logOut, user, setLoading } = useContext(UserContext);
  const navigate = useNavigate();

  // logOut handler
  const handleLogOut = () => {
    logOut()
      .then((res) => {
        console.log(res);
        toast.success("Log Out successfully");
        navigate("/login");
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  // nav items
  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      {!user?.uid ? undefined : (
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </>
      )}
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>
    </>
  );
  return (
    <section>
      <div className="navbar bg-gray-50 lg:py-4">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
            Laptop Mart
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 text-xl">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {user?.uid ? (
            <button onClick={handleLogOut} className="btn btn-primary">
              Log Out
            </button>
          ) : (
            <>
              <Link to="/login" className="mr-3">
                <button className="btn btn-primary">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-primary btn-outline">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
