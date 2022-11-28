import React from "react";
import { Advertise } from "../Advertise/Advertise";
import Brand from "../Brand/Brand";
import { Info } from "../Info/Info";
import Slider from "../Slider/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <Advertise/>
      <Brand />
      <Info/>
    </div>
  );
};

export default Home;