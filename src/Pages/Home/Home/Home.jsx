import React from "react";
import { Advertise } from "../Advertise/Advertise";
import Brand from "../Brand/Brand";
import Slider from "../Slider/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <Advertise/>
      <Brand />
    </div>
  );
};

export default Home;