import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/AuthProvider";

const BookingModal = ({ product, buyerName, email, closeModal }) => {
  const [disabled, setDisabled] = useState(false);
  const { sellerEmail, name, price, _id, imageUrl } = product;
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePostBooking = (e) => {
    e.preventDefault();
    setDisabled(true);
    const phoneNumber = e.target.number.value;
    const meetingLocation = e.target.location.value;
    // post booking
    axios
      .post(
        `${import.meta.env.VITE_server_url}bookings`,
        {
          sellerEmail,
          price,
          productId: _id,
          productImg: imageUrl,
          buyerName,
          buyerEmail: email,
          productName: name,
          phoneNumber,
          meetingLocation,
          paid: false,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("lmt")}`,
          },
        }
      )
      .then((res) => {
        // category post done
        if (res.data.result.acknowledged) {
          toast.success("Product added successfully!");
          setDisabled(false);
          closeModal(null);
        }
      })
      .catch((err) => {
        if (err?.response?.status === 409) {
          toast.error("You already booked this product!");
          setDisabled(false);
          closeModal(null);
        }
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          logOut()
            .then(() => {
              toast.error("Session Expired Please login again");
              navigate("/login");
            })
            .catch((err) => {
              console.log(err.message);
              setDisabled(false);
              closeModal(null);
            });
        }
      });
  };
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h2 className="text-xl font-bold text-center mb-2 text-primary">
            Booking Info
          </h2>
          <h3 className="font-semibold text-lg text-start">
            Your Name: {buyerName}
          </h3>
          <h3 className="font-semibold text-lg text-start">
            Your Email: {email}
          </h3>
          <h3 className="font-semibold text-lg text-start">
            Product Name: {name}
          </h3>
          <h3 className="font-semibold text-lg text-start">
            Product Price: {price}
          </h3>
          <h2 className="text-xl font-bold text-start mb-2 text-primary">
            Extra Info
          </h2>
          <form onSubmit={handlePostBooking} className="grid grid-cols-1 gap-4">
            <input
              required
              name="number"
              type="number"
              placeholder="your phone number"
              className="input input-bordered input-primary w-full"
            />
            <input
              required
              name="location"
              type="text"
              placeholder="meeting location"
              className="input input-bordered input-primary w-full"
            />
            <div className="modal-action flex justify-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={disabled}
              >
                Book
              </button>
              <button
                onClick={() => closeModal(null)}
                className="btn btn-primary btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
