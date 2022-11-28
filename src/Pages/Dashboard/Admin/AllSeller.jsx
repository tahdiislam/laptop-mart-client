import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";
import Loading from "../../../Component/Spinner/Loading";
import { UserContext } from "../../../Context/AuthProvider";

const AllSeller = () => {
  const [deleteUser, setDeleteUser] = useState(null);
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();
  // get all the sellers
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const users = axios
        .get(`${import.meta.env.VITE_server_url}users?role=seller`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("lmt")}`,
          },
        })
        .then((res) => res.data.result)
        .catch((err) => console.log(err));
      return users;
    },
  });

  // delete user handler
  const handleDeleteUser = () => {
    // delete user
    axios
      .delete(`${import.meta.env.VITE_server_url}user/${deleteUser._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("lmt")}`,
        },
      })
      .then((res) => {
        if (res.data.result.deletedCount) {
          toast.success("User deleted successfully.");
          refetch();
          setDeleteUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401 || err.response.status === 403) {
          logOut()
            .then(() => {
              toast.error("Session Expired Please login again");
              navigate("/login");
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      });
  };

  // verify seller
  const handleVerifyUser = (email) => {
    // verify
    axios
      .get(`${import.meta.env.VITE_server_url}verify-user/${email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("lmt")}`,
        },
      })
      .then((res) => {
        if (res.data.result.modifiedCount) {
          toast.success("Seller verified successfully");
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401 || err.response.status === 403) {
          logOut()
            .then(() => {
              toast.error("Session Expired Please login again");
              navigate("/login");
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      });
  };
  // spinner
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h1 className="text-4xl font-bold text-start ml-4 text-primary mb-4">
        All Sellers
      </h1>
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Delete</th>
                <th>Status</th>
                <th>Send Message</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((user) => (
                <tr key={user._id}>
                  <th>
                    <label
                      onClick={() => setDeleteUser(user)}
                      htmlFor="confirm-modal"
                      className="btn btn-error btn-circle btn-outline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user?.image} alt="" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user?.email}</td>
                  <td>
                    {!user?.userVerified ? (
                      <button
                        onClick={() => handleVerifyUser(user.email)}
                        className="btn btn-primary btn-xs"
                      >
                        Verify User
                      </button>
                    ) : (
                      <p className="text-primary text-lg font-semibold">
                        Verified
                      </p>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-primary btn-xs">
                      Send Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {deleteUser && (
            <ConfirmModal
              deleteProduct={deleteUser}
              setDeleteProduct={setDeleteUser}
              handler={handleDeleteUser}
              text="Are you sure you want to delete this User?"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllSeller;
