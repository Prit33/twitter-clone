import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  updateTweet,
  getExploreTweets,
  getUserTweets
  
} from "../controllers/tweet.js";

const router = express.Router();

// Create a Tweet
router.post("/", verifyToken, createTweet);

// Delete a Tweet
router.delete("/:id", verifyToken, deleteTweet);

// get all timeline tweets
router.get("/timeline/:id", getAllTweets);

// get user Tweets only
router.get("/user/all/:id",getUserTweets);

// edit tweet
router.put("/:id",verifyToken,updateTweet);

//explore
router.get("/explore", getExploreTweets);


export default router;
