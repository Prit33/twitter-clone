import axios from "axios";
import React, { useState } from "react";
import formatDistance from "date-fns/formatDistance";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const Tweet = ({ tweet, setData }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [userData, setUserData] = useState();

  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
  const location = useLocation().pathname;

  // console.log(tweet._id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`/users/find/${tweet.userId}`);

        setUserData(findUser.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [tweet.userId]);

  


  return (
    <div>
      {userData && (
        <>
          <div className="flex space-x-2">
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold text-neutral-500">{userData.username}</h3>
            </Link>

            {/* using date-fns */}
            <p className="text-xs py-1 font-thin text-slate-600 "> -{dateStr}</p>

          </div>

          <p>{tweet.description}</p>
        </>
      )}
    </div>
  );
};

export default Tweet;
