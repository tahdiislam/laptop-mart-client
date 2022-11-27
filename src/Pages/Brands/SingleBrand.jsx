import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import ProductCard from "../../Shared/ProductCard";

const SingleBrand = () => {
  // get brand data
  const { category, products } = useLoaderData();
  return (
    <div>
      <h1 className="text-4xl text-primary font-bold ml-4 my-4">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} category={category}/>
        ))}
      </div>
    </div>
  );
};

export default SingleBrand;
