import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

function CaptainSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vechileColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  async function handleSignup(e) {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vechile: {
        color: vechileColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vechileType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      newCaptain
    );

    if (response.status == 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  }
  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 py-6 px-6">
      <img
        src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png"
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

          <h3 className="font-semibold mb-1">Vechile's Info</h3>
          <div className="flex gap-4 mb-2">
            <input
              type="text"
              className="w-full px-4 py-2 w-1/2 rounded-md placeholder:text-sm bg-gray-200"
              required
              value={vechileColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              placeholder="Vechile color"
            />
            <input
              type="text"
              className="w-full px-4 py-2 w-1/2 rounded-md placeholder:text-sm bg-gray-200"
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              placeholder="Vechile plate"
            />
          </div>
          <div className="flex gap-4 mb-2">
            <input
              type="number"
              className="w-full px-4 py-2 w-1/2 rounded-md placeholder:text-sm bg-gray-200"
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              placeholder="Vehicle capacity"
            />
            <select
              className="w-full px-4 py-2 w-1/2 rounded-md placeholder:text-sm bg-gray-200"
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>
                vehicle type
              </option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
              <option value="car">Car</option>
            </select>
          </div>
          <button className="w-full bg-black text-white font-semibold py-2 rounded-md mt-4">
            Sign up
          </button>
          <p className="text-center text-sm mt-2">
            Already have an account ?{" "}
            <Link to="/captain-login" className="text-blue-400">
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
  );
}

export default CaptainSignup;
