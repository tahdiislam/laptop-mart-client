import React from "react";

const Loading = ({classes, size}) => {
  return (
    <div className={`h-full w-full flex justify-center items-center ${classes}`}>
      <div className={`border border-2 rounded-full animate-spin border-primary h-8 w-8 border-dashed ${size}`}></div>
    </div>
  );
};

export default Loading;
