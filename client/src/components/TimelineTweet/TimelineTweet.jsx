import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";

const TimelineTweet = () => {
  const [timeLine, setTimeLine] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timelineTweets = await axios.get(       // endpoint: api/tweets/timeline/:id
          `https://twitter-clone-z2db.onrender.com/api/tweets/timeline/${currentUser._id}`
        );

        const sortedTweets = timelineTweets.data.sort(      // sorting in chronological order
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTimeLine(sortedTweets);
        // console.log(sortedTweets);
        // setSortedTweets(sortedTweets);

      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser._id]);

  return (
    <div className="mt-6">
      {timeLine &&
        timeLine.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet tweet={tweet} setData={setTimeLine} />
            </div>
          );
        })}
    </div>
  );
};

export default TimelineTweet;
