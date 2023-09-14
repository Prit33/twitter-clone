import Tweet from "../models/Tweet.js";
import { handleError } from "../error.js";
import User from "../models/User.js";

export const createTweet = async (req, res, next) => {          //  POST request| need access_token of current sign in user in header and userId and description in body as json 
    // POST req: http://localhost:8000/api/tweets/ 
    const newTweet = new Tweet(req.body);
    try {
        const savedTweet = await newTweet.save();
        res.status(200).json(savedTweet);
    } catch (err) {
        handleError(500, err);
    }
};

export const deleteTweet = async (req, res, next) => {      // DELETE REQUEST| need access_token of current sign in user in header and id of user(Object id in user schema) in body as json
    // in api route, id will be given of that tweet who is to be deleted (_id from tweet schema)
    try {
        const tweet = await Tweet.findById(req.params.id);
        
        // console.log("react userId:",req.body.userId);
        // console.log("User id:", tweet.userId);

        if (tweet.userId === req.body.userId) {               // if owner of tweet= user who is login, then only delete
            await tweet.deleteOne();
            res.status(200).json("tweet has been deleted");
            console.log("deleted")
        } else {
            handleError(500, err);
        }
    } catch (err) {
        handleError(500, err);
    }
};

export const getAllTweets = async (req, res, next) => {         // GET request| in the api route end point, paste the id userId of the user, 
    // in timeline, user only get his tweets and tweet of whom he follows 
    // e.g http://localhost:8000/api/tweets/timeline/6501f742c2e2cb239ce12f86
    try {
        const currentUser = await User.findById(req.params.id);         // finding currrent user
        const userTweets = await Tweet.find({ userId: currentUser._id });
        const followersTweets = await Promise.all(
            currentUser.following.map((followerId) => {
                return Tweet.find({ userId: followerId });
            })
        );

        res.status(200).json(userTweets.concat(...followersTweets));
    } catch (err) {
        handleError(500, err);
    }
};

export const updateTweet = async (req, res, next) => {            //PUT request| access_token is needed of current user sign in 
    //  and description of new tweet in the body in json and in api route endpoint objectId(_id) of that tweet
    try {
        const tweet = await Tweet.findById(req.params.id);
        tweet.description = req.body.description;
        const updatedTweet = await tweet.save();
        res.status(200).json(updatedTweet);
    } catch (err) {
        handleError(500, err);
    }
}

export const getExploreTweets = async (req, res, next) => {
    try {
        const getExploreTweets = await Tweet.find({
            likes: { $exists: true },
        }).sort({ likes: -1 });

        res.status(200).json(getExploreTweets);
    } catch (err) {
        handleError(500, err);
    }
};

export const getUserTweets = async (req, res, next) => {
    try {
        const userTweets = await Tweet.find({ userId: req.params.id }).sort({
            createAt: -1,
        });

        res.status(200).json(userTweets);
    } catch (err) {
        handleError(500, err);
    }
};