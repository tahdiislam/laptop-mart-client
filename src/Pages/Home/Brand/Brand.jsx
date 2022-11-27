import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Brand = () => {
  // load category
  const { data: categories = [] } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const data = axios
        .get(`${import.meta.env.VITE_server_url}category`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("lmt")}`,
          },
        })
        .then((res) => res.data.result)
        .catch((err) => console.log(err));
      return data;
    },
  });
  console.log(categories);
  return (
    <div>
      <h2 className="text-4xl font-bold text-primary text-center my-6">
        All Brands
      </h2>
      <div className="px-4 md:px-0 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category) => (
            <div
              key={category._id}
              className="card bg-base-100 shadow-xl image-full"
            >
              <figure>
                <img src={category.imageUrl} />
              </figure>
              <div className="card-body">
                <div className="h-full card-actions justify-center items-center">
                  <Link to={`/category/${category._id}`}>
                    <button className="btn btn-ghost text-primary text-4xl">
                      {category.category}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brand;
