import React, { useState, useEffect } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Tweet from "../../components/Tweet/Tweet";

import { following } from "../../redux/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axios.get(`/tweets/user/all/${id}`);
        const userProfile = await axios.get(`/users/find/${id}`);

        setUserTweets(userTweets.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser, id]);

  const handleFollow = async () => {
    if (!currentUser.following.includes(id)) {
      try {
        const follow = await axios.put(`/users/follow/${id}`, {
          id: currentUser._id,
        });
        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    } else {
      try {
        const unfollow = await axios.put(`/users/unfollow/${id}`, {
          id: currentUser._id,
        });

        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      // console.log(currentUser._id);
      // console.log(id);
      const userId=currentUser._id
      // console.log(userId)
      axios.delete(`/tweets/${id}`, { data: { userId: userId} });
      // setData();
    } catch (err) {
      console.log("error", err);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSidebar />
        </div>

        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
            {currentUser._id === id ? (
              <h2 className="text-slate-500 text-base">Welcome to your profile</h2>
            ) : currentUser.following.includes(id) ? (
              <button
                className="px-4 h-10  bg-black rounded-full text-white"
                onClick={handleFollow}
              >
                Following
              </button>
            ) : (
              <button
                className="px-4 h-10  bg-black rounded-full text-white"
                onClick={handleFollow}
              >
                Follow
              </button>
            )}
          </div>
          <div className="mt-6 ">
            {userTweets &&
              userTweets.map((tweet) => {
                return (
                  <div className="p-2" key={tweet._id}>
                    <button className="bg-red-300 rounded-full px-4 py-2 float-right"
                      onClick={() => handleDelete(tweet._id)}>
                      Delete
                    </button>
                    <Tweet tweet={tweet} setData={setUserTweets} />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="px-6">
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default Profile;
