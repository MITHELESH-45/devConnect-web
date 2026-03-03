import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../utils/constants";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ================= LOGIN ================= */

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        BACKEND_BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  /* ================= SIGNUP ================= */

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        BACKEND_BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
 
      dispatch(addUser(res.data.data));
      console.log(res.data.data);

      navigate("/profile");

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="card bg-base-300 w-96 mx-auto mt-20 shadow-xl">
      <div className="card-body">

        <h2 className="font-bold text-3xl text-center mb-4">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <form onSubmit={isLogin ? handleLogin : handleSignup}>

          {!isLogin && (
            <>
              <div className="form-control">
                <label className="label-text">First Name</label>
                <input
                  type="text"
                  className="input input-bordered mt-1"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="form-control mt-3">
                <label className="label-text">Last Name</label>
                <input
                  type="text"
                  className="input input-bordered mt-1"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="form-control mt-3">
            <label className="label-text">Email</label>
            <input
              type="email"
              className="input input-bordered mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control mt-3">
            <label className="label-text">Password</label>
            <input
              type="password"
              className="input input-bordered mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button className="btn btn-primary w-full mt-5">
            {isLogin ? "Login" : "Signup"}
          </button>

        </form>

        <p
          className="text-center mt-4 cursor-pointer text-blue-500"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
        >
          {isLogin
            ? "New here? Create an account"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
};

export default Auth;