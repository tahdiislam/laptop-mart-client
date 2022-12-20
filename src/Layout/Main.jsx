import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import Header from "../Shared/Header";
import CircleLoader from "react-spinners/CircleLoader";

export default function Main() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div>
      {loading ? (
        <div
          // style={{ height: "100%" }}
          className="flex w-full h-screen justify-center items-center"
        >
          <CircleLoader
            color={"#4ED01F"}
            loading={loading}
            // cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          <Header />
          <Outlet />
          <Footer />
        </div>
      )}
    </div>
  );
}
