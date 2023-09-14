import React from "react";
import { Link } from "react-router-dom";

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TagIcon from "@mui/icons-material/Tag";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

const LeftSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col h-full md:h-[90vh] justify-between mr-6">
      <div className="mt-6 flex flex-col space-y-4">
        <Link to="/">
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <HomeRoundedIcon fontSize="large" />
            <p>Home</p>
          </div>
        </Link>
        <Link to="/explore">
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <TagIcon fontSize="large" />
            <p>Explore</p>
          </div>
        </Link>
        <Link to={`/profile/${currentUser._id}`}>
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <AccountCircleRoundedIcon fontSize="large" />
            <p>Profile</p>
          </div>
        </Link>
      </div>
      <div className="flex justify-between m-4">
        <div className=" p-2">
          <p className="text-base font-bold mr-2">{currentUser.username}</p>
          <p  className="text-xs">@{currentUser.username}</p>
        </div>
        <div>
          <Link to="signin">
            <button
              className="bg-slate-700 px-6 py-2 text-white rounded-full"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
