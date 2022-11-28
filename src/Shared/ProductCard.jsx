import React, { useContext, useState } from "react";
import BookingModal from "../Component/BookingModal/BookingModal";
import { UserContext } from "../Context/AuthProvider";

const ProductCard = ({ product, category }) => {
  const [bookingProduct, setBookingProduct] = useState(null);
  const { user } = useContext(UserContext);
  const {
    imageUrl,
    condition,
    color,
    cpuModel,
    data,
    graphicsModel,
    hardDiskSize,
    location,
    name,
    originalPrice,
    price,
    sellerEmail,
    sellerImg,
    sellerName,
    userVerified,
    ram,
    screenSize,
    operatingSystem,
    purchaseDate,
  } = product;

  return (
    <div className="p-4 w-full">
      <div className="h-full border border-primary rounded-lg overflow-hidden shadow-lg">
        <img className="w-full" src={imageUrl} alt="blog" />
        <div className="p-6">
          <div className="flex justify-start gap-2 my-1">
            <h3 className="text-xl font-bold">{name}</h3>
            <h3 className="text-sm font-semibold">{category}</h3>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <h3 className="badge badge-primary">{location}</h3>
              <div>
                <p className="text-xl font-bold">
                  Price: <span className="text-primary">$ {price}</span>
                </p>
                <p className="text-xl">
                  Original price: <span>$ {originalPrice}</span>
                </p>
              </div>
              <div>
                <p className="text-xl font-medium">
                  Used Duration: {purchaseDate}
                </p>
                <p className="text-lg">Post on: {data}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg text-start font-bold">Specification</h3>
              <h4>Processor: {cpuModel}</h4>
              <h4>RAM: {ram}</h4>
              <h4>Storage: {hardDiskSize}</h4>
              <h4>Graphics: {graphicsModel}</h4>
              <h4>Display: {screenSize}</h4>
              <h4>Color: {color}</h4>
              <h4>Operation System: {operatingSystem}</h4>
              <h4>Condition: {condition}</h4>
            </div>
          </div>
          <div className="flex items-center gap-2 my-1">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={sellerImg} />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1">
                <p className="font-bold">{sellerName}</p>
                {userVerified ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                ) : (
                  <>
                    <small className="text-error">{"(not verified)"}</small>
                  </>
                )}
              </div>
              <p>{sellerEmail}</p>
            </div>
          </div>
          <div className="my-2 w-full">
            <label
              onClick={() => setBookingProduct(product)}
              htmlFor="booking-modal"
              className="btn btn-primary w-full"
            >
              Book Now
            </label>
          </div>
          <div className="divider"></div>
          <div className="flex justify-center">
            <button className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </button>
            <div className="divider divider-horizontal"></div>
            <button className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                />
              </svg>
            </button>
          </div>
        </div>
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
  );
};

export default ProductCard;
