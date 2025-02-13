import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLaststName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  function handleSignup(e) {
    e.preventDefault();
    setUserData({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });
    setFirstName("");
    setLastName("");
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
              handleSignup(e);
            }}
          >
            <h3 className="font-semibold mb-1">What's your name</h3>
            <div className="flex gap-4 mb-2">
              <input
                type="text"
                className="w-full px-4 py-2 w-1/2 rounded-md placeholder:text-sm bg-gray-200"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
              <input
                type="text"
                className="w-full px-4 py-2 w-1/2 rounded-md placeholder:text-sm bg-gray-200"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </div>
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
              Sign up
            </button>
            <p className="text-center text-sm mt-2">
              Already have an account ?{" "}
              <Link to="/login" className="text-blue-400">
                Login here
              </Link>{" "}
            </p>
          </form>
          <p className="text-[10px]">
            By using this app, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </div>
    </>
  );
}

export default UserSignup;
