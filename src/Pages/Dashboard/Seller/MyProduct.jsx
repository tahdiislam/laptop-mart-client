import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";
import Loading from "../../../Component/Spinner/Loading";
import { UserContext } from "../../../Context/AuthProvider";

const MyProduct = () => {
  const [deleteProduct, setDeleteProduct] = useState(null);
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();
  // get all the product
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_server_url}products`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("lmt")}`,
        },
      });
      const data = res.json();
      return data;
    },
  });

  // advertised product
  const handleAdvertise = (_id) => {
    // update product
    axios
      .patch(
        `${import.meta.env.VITE_server_url}products/${_id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("lmt")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.result.modifiedCount) {
          toast.success("Advertized successfully");
          refetch();
        }
      })
      .catch((err) => {
        if (err.response.status) {
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

  // delete product handler
  const handleDeleteProduct = () => {
    // delete product
    if (deleteProduct) {
      axios
        .delete(
          `${import.meta.env.VITE_server_url}products/${deleteProduct._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("lmt")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.result.deletedCount) {
            toast.success("Product deleted successfully.");
            refetch();
            setDeleteProduct(null);
          }
        })
        .catch((err) => {
          if (err.response.status) {
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
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h1 className="text-4xl font-bold text-left ml-4 text-primary">
        My Product
      </h1>
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Delete</th>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Advertise</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((product) => (
                <tr key={product._id}>
                  <th>
                    <label
                      onClick={() => setDeleteProduct(product)}
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
                          <img src={product.imageUrl} alt="" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{product.price}</td>
                  <td>
                    {product.sold ? (
                      <p className="text-primary text-lg font-semibold">Sold</p>
                    ) : (
                      <p className="text-blue-500 font-semibold text-lg">
                        Unsold
                      </p>
                    )}
                  </td>
                  <td>
                    {product.advertise ? (
                      <p>Sponsor added</p>
                    ) : (
                      <button
                        onClick={() => handleAdvertise(product._id)}
                        className="btn btn-primary btn-xs"
                      >
                        Advertise
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {deleteProduct && (
            <ConfirmModal
              deleteProduct={deleteProduct}
              setDeleteProduct={setDeleteProduct}
              handler={handleDeleteProduct}
              text="Are you sure you want to delete this product?"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProduct;
