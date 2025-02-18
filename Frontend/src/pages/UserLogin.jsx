import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserDataContext);

  async function handleLogin(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      user
    );

    if (response.status === 200) {
      const data = response.data;
      setUserData(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  }
  return (
    <>
      <div className="w-full h-screen flex flex-col bg-gray-100 py-6 px-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          className="w-14"
          alt=""
        />
        <div className="flex h-screen flex-col justify-between">
          <form
            className="w-full flex flex-col gap-2 mt-10"
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            <h3 className="font-semibold mb-1">What's your email</h3>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md placeholder:text-sm bg-gray-200 mb-2"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />
            <h3 className="font-semibold mb-1">Enter Password</h3>
            <input
              type="password"
              className="w-full py-2 px-4 rounded-md placeholder:text-sm bg-gray-200 mb-2"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <button className="w-full bg-black text-white font-semibold py-2 rounded-md mt-4">
              Login
            </button>
            <p className="text-center text-sm mt-2">
              New here ?{" "}
              <Link to="/signup" className="text-blue-400">
                Create new Account
              </Link>{" "}
            </p>
          </form>
          <Link
            to="/captain-login"
            className="w-full bg-green-500 text-white text-center font-semibold py-2 rounded-md mb-4"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
