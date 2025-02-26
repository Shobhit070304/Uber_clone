import React, { useContext, useEffect, useRef, useState } from "react";
import CaptainDetails from "../components/CaptainDetails";
import RidesPopUp from "../components/RidesPopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketDataContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainHome = () => {
  const [ridesPanelOpen, setRidesPanelOpen] = useState(false);
  const [ConfirmRidesPanelOpen, setConfirmRidesPanelOpen] = useState(false);
  const [ride, setRide] = useState();
  const ridesPanel = useRef(null);
  const confirmRidesPanel = useRef(null);

  const { socket } = useContext(SocketDataContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;

          socket.emit("update-captain-location", {
            captainId: captain._id,
            location: { ltd: latitude, lng: longitude },
          });
        });
      }
    };
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  });

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidesPanelOpen(true);
  });

  useGSAP(
    function () {
      if (ridesPanelOpen) {
        gsap.to(ridesPanel.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridesPanel.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridesPanelOpen]
  );

  useGSAP(
    function () {
      if (ConfirmRidesPanelOpen) {
        gsap.to(confirmRidesPanel.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidesPanel.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ConfirmRidesPanelOpen]
  );

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  return (
    <>
      <div className="h-screen overflow-hidden">
        <div className="h-screen w-screen">
          <CaptainDetails />
        </div>

        {/* Rides pop up */}
        <div
          ref={ridesPanel}
          className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3"
        >
          <RidesPopUp
            ride={ride}
            confirmRide={confirmRide}
            setRidesPanelOpen={setRidesPanelOpen}
            setConfirmRidesPanelOpen={setConfirmRidesPanelOpen}
          />
        </div>

        {/* Confirm Rides pop up */}
        <div
          ref={confirmRidesPanel}
          className="fixed h-screen w-full z-10 bottom-0 translate-y-full bg-white px-3"
        >
          <ConfirmRidePopUp
            ride={ride}
            setRidesPanelOpen={setRidesPanelOpen}
            setConfirmRidesPanelOpen={setConfirmRidesPanelOpen}
          />
        </div>
      </div>
    </>
  );
};

export default CaptainHome;
