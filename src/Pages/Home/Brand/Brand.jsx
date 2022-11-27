import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../../Component/Spinner/Loading";

const Brand = () => {
  // load category
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const data = axios
        .get(`${import.meta.env.VITE_server_url}category`)
        .then((res) => res.data.result)
        .catch((err) => console.log(err));
      return data;
    },
  });

  // spinner
  if (isLoading) {
    return (
      <div className="py-20">
        <Loading size="w-12 h-12" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-bold text-primary text-center my-6">
        All Brands
      </h2>
      <div className="px-4 md:px-0 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category) => (
            <Link key={category._id} to={`/category/${category._id}`} aria-label="View Item">
              <div className="relative overflow-hidden transition duration-200 transform rounded-xl shadow-lg hover:-translate-y-2 hover:shadow-2xl">
                <img
                  className="image-full w-full h-56 md:h-64 xl:h-80"
                  src={category.imageUrl}
                  alt=""
                />
                <div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-primary bg-opacity-10 opacity-0 hover:opacity-100">
                  <div className="h-full flex justify-start items-start">
                    <button className="btn text-primary btn-ghost text-4xl ">
                      {category.category}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brand;
