import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../../../Component/Spinner/Loading";

export const Advertise = () => {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const users = axios
        .get(`${import.meta.env.VITE_server_url}product-add`)
        .then((res) => res.data.result)
        .catch((err) => console.log(err));
      return users;
    },
  });
  console.log(data);
  // loading
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {data?.length !== 0 && (
        <div className="bg-gray-100">
          <h1 className="text-4xl text-primary font-bold my-6 text-center">
            Advertised
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((product) => (
              <div
                key={product._id}
                className="card w-96 bg-base-100 shadow-xl image-full"
              >
                <figure>
                  <img src={product.imageUrl} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-primary">${product?.price}</h2>
                  <p className="text-lg">{product?.name}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
