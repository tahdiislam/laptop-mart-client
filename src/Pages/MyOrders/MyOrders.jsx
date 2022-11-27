import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ConfirmModal from "../../Component/ConfirmModal/ConfirmModal";
import Loading from "../../Component/Spinner/Loading";
import { UserContext } from "../../Context/AuthProvider";

const MyOrders = () => {
  const [deleteProduct, setDeleteProduct] = useState(null);
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();
  // get my order
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const users = axios
        .get(`${import.meta.env.VITE_server_url}bookings`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("lmt")}`,
          },
        })
        .then((res) => res.data.result)
        .catch((err) => console.log(err));
      return users;
    },
  });

  const handleDeleteProduct = () => {
    // delete user
    axios
      .delete(
        `${import.meta.env.VITE_server_url}bookings/${deleteProduct._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("lmt")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.result.deletedCount) {
          toast.success("Product deleted successfully");
          refetch();
          setDeleteProduct(null);
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
      <h1 className="text-4xl font-bold text-left ml-4 text-primary mb-4">
        My Orders
      </h1>
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Delete</th>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((booking) => (
                <tr key={booking._id}>
                  <th>
                    <label
                      onClick={() => setDeleteProduct(booking)}
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
                          <img src={booking?.productImg} alt="" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold"></div>
                      </div>
                    </div>
                  </td>
                  <td>{booking?.productName}</td>
                  <td>{booking?.price}</td>
                  <td>
                    {booking?.paid ? (
                      <p className="text-primary text-xl font-semibold">PAID</p>
                    ) : (
                      <Link to={`/dashboard/my-orders/payment/${booking._id}`}>
                        <button className="btn btn-primary btn-xs">Pay</button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {deleteProduct && (
            <ConfirmModal
              deleteProduct={{ name: deleteProduct.productName }}
              setDeleteProduct={setDeleteProduct}
              handler={handleDeleteProduct}
              text="Are you sure you want to delete this Product?"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
