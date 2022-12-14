import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import BookingModal from "../../../Component/BookingModal/BookingModal";
import Loading from "../../../Component/Spinner/Loading";
import { UserContext } from "../../../Context/AuthProvider";

export const Advertise = () => {
  const [bookingProduct, setBookingProduct] = useState(null);
  const { user } = useContext(UserContext);
  const {
    data = [],
    isLoading,
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
  // spinner
  if (isLoading) {
    return (
      <div className="py-20">
        <Loading size="w-12 h-12" />
      </div>
    );
  }
  return (
    <>
      {data?.length !== 0 && (
        <div className="bg-gray-100 px-4 md:px-0 rounded-xl">
          <h1 className="text-4xl text-primary font-bold my-6 text-center pt-4">
            Advertised
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((product) => (
              <div
                key={product._id}
                className="card bg-base-100 shadow-xl image-full"
              >
                
                <figure>
                  <img src={product.imageUrl} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-primary">${product?.price}</h2>
                  <p className="text-lg text-gray-100">{product?.name}</p>
                  <div className="card-actions justify-end">
                    <label
                      onClick={() => setBookingProduct(product)}
                      htmlFor="booking-modal"
                      className={`btn btn-primary w-full`}
                    >
                      Book Now
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {bookingProduct && (
            <BookingModal
              product={bookingProduct}
              buyerName={user?.displayName}
              email={user?.email}
              closeModal={setBookingProduct}
            />
          )}
        </div>
      )}
    </>
  );
};
