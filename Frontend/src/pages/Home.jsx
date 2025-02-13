import React from "react";
import Uber from "../assets/Uberlogo.png";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <div className="bg-cover bg-left bg-[url(https://images.unsplash.com/photo-1566243052021-d39ace07c392?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] h-screen w-full flex flex-col justify-between">
        <img src={Uber} className="w-20 pt-4 pl-4" alt="" />
        <div className="bg-white w-full p-5 flex flex-col items-center">
          <h1 className="text-3xl font-semibold">Get Started with Uber</h1>
          <Link
            to={"/login"}
            className="w-full flex justify-center items-center bg-black text-white rounded-md font-semibold p-3 mt-4 mb-2"
          >
            Continue
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
