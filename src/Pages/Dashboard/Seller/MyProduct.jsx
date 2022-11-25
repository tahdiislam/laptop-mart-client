import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../Component/Spinner/Loading";

const MyProduct = () => {
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
  if (isLoading) {
    return <Loading />;
  }
  console.log(data.products);
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
              {data.products.map((product) => (
                <tr key={product._id}>
                  <th>
                    <button className="btn btn-square">
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
                    </button>
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
                  <td></td>
                  <td>
                    <button className="btn text-primary btn-ghost btn-sm">
                      Advertise
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProduct;
