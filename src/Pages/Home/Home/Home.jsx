import React, { useState } from "react";
import { useEffect } from "react";
import { Advertise } from "../Advertise/Advertise";
import Brand from "../Brand/Brand";
import { Info } from "../Info/Info";
import Slider from "../Slider/Slider";
// import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Home = () => {
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 4000);
  // }, []);
  return (
    <div>
      {/* {loading ? (
        <div style={{height: "100%"}} className="flex w-full justify-center items-center">
          <ClimbingBoxLoader
            color={"#4ED01F"}
            loading={loading}
            // cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div> */}
          <Slider />
          <Advertise />
          <Brand />
          <Info />
        {/* </div>
      )} */}
    </div>
  );
};

export default Home;
