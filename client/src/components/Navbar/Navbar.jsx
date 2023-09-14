import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import UserPlaceholder from "../UserPlaceholder/UserPlaceholder";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 my-5 justify-center">
      <div className="mx-auto md:mx-0">
      </div>

      <div className="col-span-2 md:border-x-2  md:border-slate-200 md:px-6 my-6 md:my-0">
        <div className="flex justify-between items-center ">
          <h2 className=" font-bold text-2xl ">
            {location.includes("profile") ? (
              <UserPlaceholder setUserData={setUserData} userData={userData} />
            ) : location.includes("explore") ? (
              "#Explore"
            ) : location.includes("signin") ? (
              "SignIn / SignUp"
            ): "Home"
          }
          </h2>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
