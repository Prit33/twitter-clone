import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";

import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {              
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { username, password });         // login needs username and password, POST /auth/sigin
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      alert("Wrong credentials")
      dispatch(loginFailed());
    }
  };

  const handleSignup = async (e) => {          
    // e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post("/auth/signup", {        // signup need username,email,password | POST /auth/signup
        username,
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      navigate("/signin");

    } catch (err) {
      dispatch(loginFailed());
    }
  };

  return (
    <form className="bg-gray-100 flex flex-col py-12 px-8 w-8/12 md:w-6/12 mx-auto gap-10">
      <h2 className="text-2xl font-bold text-center">Sign In</h2>

      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="username"
        className="text py-2 rounded-full px-4"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
        className="text py-2 rounded-full px-4"
      />

      <button
        className="text py-2 rounded-full px-4 bg-black text-white"
        onClick={handleLogin}
      >
        Sign in
      </button>

      <p className="text-xl font-bold text-center">Sign Up</p>

      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="username"
        className="text py-2 rounded-full px-4"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="email"
        required
        className="text py-2 rounded-full px-4"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
        className="text py-2 rounded-full px-4"
      />

      <button
        onClick={handleSignup}
        className="text py-2 rounded-full px-4 bg-black text-white"
        type="submit"
      >
        Sign up
      </button>
    </form>
  );
};

export default Signin;
