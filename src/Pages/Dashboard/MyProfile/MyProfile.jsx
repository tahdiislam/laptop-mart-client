import React, { useContext } from "react";
import { UserContext } from "../../../Context/AuthProvider";

const MyProfile = () => {
  const { user } = useContext(UserContext);
  
  return (
    <div className="h-full flex justify-center items-center">
      <h1 className="text-4xl font-bold text-center text-primary">
        {user?.displayName}'s profile
      </h1>
    </div>
  );
};

export default MyProfile;
