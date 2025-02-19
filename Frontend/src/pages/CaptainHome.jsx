import React, { useRef, useState } from "react";
import CaptainDetails from "../components/CaptainDetails";
import RidesPopUp from "../components/RidesPopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import FinishRide from "../components/FinishRide";
const CaptainHome = () => {
  const [ridesPanelOpen, setRidesPanelOpen] = useState(true);
  const [ConfirmRidesPanelOpen, setConfirmRidesPanelOpen] = useState(false);

  const ridesPanel = useRef(null);
  const confirmRidesPanel = useRef(null);

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
            setRidesPanelOpen={setRidesPanelOpen}
            setConfirmRidesPanelOpen={setConfirmRidesPanelOpen}
          />
        </div>
      </div>
    </>
  );
};

export default CaptainHome;
