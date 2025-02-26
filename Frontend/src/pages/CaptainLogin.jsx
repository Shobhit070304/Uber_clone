import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  async function handleLogin(e) {
    e.preventDefault();
    const captain = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captain
    );

    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col bg-gray-100 py-6 px-6">
        <img
          src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png"
          className="w-20"
          alt=""
        />
        <div className="flex h-screen flex-col justify-between">
          <form
            className="w-full flex flex-col gap-2 mt-6"
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
              New rider ?{" "}
              <Link to="/captain-signup" className="text-blue-400">
                Register as a captain
              </Link>{" "}
            </p>
          </form>
          <Link
            to="/login"
            className="w-full bg-yellow-600 text-white text-center font-semibold py-2 rounded-md mb-4"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </>
  );
}

export default CaptainLogin;
