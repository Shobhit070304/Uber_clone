import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForRide from "../components/LookingForRide";
import WaitingForRide from "../components/WaitingForRide";
function Home() {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vechileOpen, setVechileOpen] = useState(false);
  const [confirmRideOpen, setConfirmRideOpen] = useState(false);
  const [lookingForRideOpen, setLookingForRideOpen] = useState(false);
  const [waitingForRideOpen, setWaitingForRideOpen] = useState(false);

  const panel = useRef(null);
  const vechilePanel = useRef(null);
  const confirmRide = useRef(null);
  const lookingForRide = useRef(null);
  const waitingForRide = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
  }

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
      if (vechileOpen) {
        gsap.to(vechilePanel.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vechilePanel.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vechileOpen]
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS9CNGpGORqzYZsvq_iuvHltTOKWtxaPWTBQ&s"
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
                value={pickUp}
                onChange={(e) => {
                  setPickUp(e.target.value);
                }}
                onClick={() => setPanelOpen(true)}
                type="text"
                className="w-full py-2 px-8 mb-4 rounded-md bg-[#eee]"
                placeholder="Add a pick-up location"
              />
              <input
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
                onClick={() => setPanelOpen(true)}
                type="text"
                className="w-full py-2 px-8 rounded-md bg-[#eee]"
                placeholder="Enter your destination"
              />
            </form>
          </div>
          <div ref={panel} className="bg-white">
            <LocationSearchPanel
              setPanelOpen={setPanelOpen}
              setVechileOpen={setVechileOpen}
            />
          </div>
        </div>

        {/* Vechile part */}
        <div
          ref={vechilePanel}
          className="z-10 bg-white w-full translate-y-full absolute bottom-0 p-3"
        >
          <VehiclePanel
            setConfirmRideOpen={setConfirmRideOpen}
            setVechileOpen={setVechileOpen}
          />
        </div>

        {/* Confirm ride */}
        <div
          ref={confirmRide}
          className="z-10 bg-white w-full translate-y-full absolute bottom-0 p-3"
        >
          <ConfirmRide
            setConfirmRideOpen={setConfirmRideOpen}
            setLookingForRideOpen={setLookingForRideOpen}
          />
        </div>

        {/* Looking for ride */}
        <div
          ref={lookingForRide}
          className="z-10 bg-white w-full translate-y-full absolute bottom-0 p-3"
        >
          <LookingForRide />
        </div>

        {/* Waiting for ride */}
        <div
          ref={waitingForRide}
          className="z-10 bg-white w-full translate-y-full absolute bottom-0 p-3"
        >
          <WaitingForRide />
        </div>
      </div>
    </>
  );
}

export default Home;
