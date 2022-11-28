import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";
import Loading from "../../../Component/Spinner/Loading";
import { UserContext } from "../../../Context/AuthProvider";

const ReportedProduct = () => {
  const [deleteProduct, setDeleteProduct] = useState(null);
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();
  // get all the product
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_server_url}reports`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("lmt")}`,
        },
      });
      const data = res.json();
      return data;
    },
  });

  // delete product handler
  const handleDeleteProduct = () => {
    // delete product
    if (deleteProduct) {
      axios
        .delete(
          `${import.meta.env.VITE_server_url}product-delete-admin/${deleteProduct.productId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("lmt")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.result.deletedCount) {
            axios
              .delete(
                `${import.meta.env.VITE_server_url}reported-product/${
                  deleteProduct._id
                }`,
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
      <h1 className="text-4xl font-bold text-left ml-4 text-error mb-4">
        Reported Product
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
                    {product.reported && (
                      <p className="text-error text-lg font-semibold">
                        Reported
                      </p>
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

export default ReportedProduct;
