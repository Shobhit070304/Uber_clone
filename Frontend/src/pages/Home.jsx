import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForRide from "../components/LookingForRide";
import WaitingForRide from "../components/WaitingForRide";
import axios from "axios";
import { SocketDataContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [confirmRideOpen, setConfirmRideOpen] = useState(false);
  const [lookingForRideOpen, setLookingForRideOpen] = useState(false);
  const [waitingForRideOpen, setWaitingForRideOpen] = useState(false);
  const [vehicleType, setVehicleType] = useState("");
  const [ride, setRide] = useState();

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});

  const panel = useRef(null);
  const vehiclePanel = useRef(null);
  const confirmRide = useRef(null);
  const lookingForRide = useRef(null);
  const waitingForRide = useRef(null);

  const { socket } = useContext(SocketDataContext);
  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", {
      userType: "user",
      userId: userData._id,
    });

    socket.on("ride-confirmed", (ride) => {
      setRide(ride);
      setLookingForRideOpen(false);
      setWaitingForRideOpen(true);
    });
  }, [userData]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panel.current, {
          height: "70%",
        });
      } else {
        gsap.to(panel.current, {
          height: "0%",
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehicleOpen) {
        gsap.to(vehiclePanel.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanel.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleOpen]
  );

  useGSAP(
    function () {
      if (confirmRideOpen) {
        gsap.to(confirmRide.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRide.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRideOpen]
  );

  useGSAP(
    function () {
      if (lookingForRideOpen) {
        gsap.to(lookingForRide.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(lookingForRide.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [lookingForRideOpen]
  );

  useGSAP(
    function () {
      if (waitingForRideOpen) {
        gsap.to(waitingForRide.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForRide.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForRideOpen]
  );

  async function findTrip() {
    setVehicleOpen(true);
    setPanelOpen(false);

    try {
      console.log("aa gaya ");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(response.data.fair);
    } catch {
      // handle error
    }
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(response.data);
  }
  return (
    <>
      {" "}
      <div className="h-screen w-full relative overflow-hidden">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          className="w-16 absolute top-5 left-5"
          alt=""
        />
        <div className="h-screen w-screen">
          <img
            className="w-full h-full object-center object-cover"
            src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
            alt=""
          />
        </div>

        <div className="w-screen flex flex-col justify-end absolute h-screen top-0 rounded-t-3xl">
          <div className="h-[30%] p-5 bg-white relative">
            {panelOpen && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 absolute right-5 top-5"
                onClick={() => setPanelOpen(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
            <h3 className="text-2xl font-semibold mb-4">Find a trip</h3>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="line w-1 h-16 bg-black absolute rounded-full left-8 top-[42%]"></div>
              <input
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                value={pickup}
                onChange={handlePickupChange}
                className="w-full py-2 px-8 mb-4 rounded-md bg-[#eee]"
                type="text"
                placeholder="Add a pick-up location"
              />
              <input
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                value={destination}
                onChange={handleDestinationChange}
                className="w-full py-2 px-8 rounded-md bg-[#eee]"
                type="text"
                placeholder="Enter your destination"
              />
            </form>
            <button
              onClick={findTrip}
              className="bg-black w-full text-white px-4 py-2 rounded-lg mt-3"
            >
              Find Trip
            </button>
          </div>
          {/* Location Panel */}
          <div ref={panel} className="bg-white">
            <LocationSearchPanel
              suggestions={
                activeField === "pickup"
                  ? pickupSuggestions
                  : destinationSuggestions
              }
              setPanelOpen={setPanelOpen}
              setVehicleOpen={setVehicleOpen}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          </div>
        </div>

        {/* Vehicle part */}
        <div
          ref={vehiclePanel}
          className="z-10 bg-white w-full translate-y-full absolute bottom-0 p-3"
        >
          <VehiclePanel
            fare={fare}
            setVehicleType={setVehicleType}
            setConfirmRideOpen={setConfirmRideOpen}
            setVehicleOpen={setVehicleOpen}
          />
        </div>

        {/* Confirm ride */}
        <div
          ref={confirmRide}
          className="z-9 bg-white w-full translate-y-full absolute bottom-0 p-3"
        >
          <ConfirmRide
            fare={fare}
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            vehicleType={vehicleType}
            setConfirmRideOpen={setConfirmRideOpen}
            setLookingForRideOpen={setLookingForRideOpen}
          />
        </div>

        {/* Looking for ride */}
        <div
          ref={lookingForRide}
          className="z-8 bg-white w-full translate-y-full absolute bottom-0 p-3"
        >
          <LookingForRide
            fare={fare}
            pickup={pickup}
            destination={destination}
            vehicleType={vehicleType}
          />
        </div>

        {/* Waiting for ride */}
        <div
          ref={waitingForRide}
          className="z-7 bg-white w-full translate-y-full absolute bottom-0 p-3"
        >
          <WaitingForRide ride={ride} />
        </div>
      </div>
    </>
  );
}

export default Home;
