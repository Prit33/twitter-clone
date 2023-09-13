import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../error.js";

export const signup = async (req, res, next) => {               // Signing Up the user, need username,email,password for signup
                                                          //  http://localhost:8000/api/auth/signup and in body 
  // {
    // "username": "Starx",
    // "email": "stax33@gmail.com",
    // "password": "funky"
// }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id },process.env.JWT);

        const { password, ...othersData } = newUser._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(othersData);
    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res, next) => {                           // http://localhost:8000/api/auth/signin/,  signing in needs user and password in body in json
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(handleError(404, "User not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(handleError(400, "Wrong password"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...othersData } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(othersData);
  } catch (err) {
    next(err);
  }
};
