import { handleError } from "../error.js";
import User from "../models/User.js";
import Tweet from "../models/Tweet.js";

export const getUser = async (req, res, next) => {          // GET request: need _id | http://localhost:8000/api/users/find/that_id
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {          //  PUT request: need access_token( got when user sign in) in the header and updating field 
                                                          // e.g:  http://localhost:8000/api/users/650178c08745bd4c164c0108
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(handleError(403, "You can update only your account"));
  }
};

export const deleteUser = async (req, res, next) => {     // DELETE Request: need access_token in header, http://localhost:8000/api/users/650178c08745bd4c164c0108
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Tweet.remove({ userId: req.params.id });      // if user get deleted then its tweet also get deleted

      res.status(200).json("User delete");
    } catch (err) {
      next(err);
    }
  } else {
    return next(handleError(403, "You can only update your own account"));
  }
};

export const follow = async (req, res, next) => {       // PUT request: need access_token of current signIn user and id of current of sign in user in json and in the route end point id of other follower user
                                                  // this will make current user to follow that user whose id was given 
  
  try {
    //user
    const user = await User.findById(req.params.id);
    //current user
    const currentUser = await User.findById(req.body.id);

    if (!user.followers.includes(req.body.id)) {
      // console.log(req.body);
      await user.updateOne({
        $push: { followers: req.body.id },          // pushing follower id into followers array of current user 
      });

      await currentUser.updateOne({ $push: { following: req.params.id } });
    } else {
      res.status(403).json("you already follow this user");
    }
    res.status(200).json("following the user");
  } catch (err) {
    next(err);
  }
};

export const unFollow = async (req, res, next) => {
  try {
    //user
    const user = await User.findById(req.params.id);
    //current user
    const currentUser = await User.findById(req.body.id);

    if (currentUser.following.includes(req.params.id)) {
      await user.updateOne({
        $pull: { followers: req.body.id },              // pulling follower from followers array
      });

      await currentUser.updateOne({ $pull: { following: req.params.id } });
    } else {
      res.status(403).json("you are not following this user");
    }
    res.status(200).json("unfollowing the user");
  } catch (err) {
    next(err);
  }
};
