import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function CaptainRiding() {
  const [finishRidePanelOpen, setFinishRidePanelOpen] = useState(false);
  const finishRide = useRef(null);
  useGSAP(
    function () {
      if (finishRidePanelOpen) {
        gsap.to(finishRide.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRide.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanelOpen]
  );
  return (
    <>
      <div className="h-screen w-screen">
        <div className="h-4/5 w-screen relative">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            className="w-16 absolute top-5 left-5"
            alt=""
          />
          <Link
            to={"/captain-home"}
            className="bg-gray-100 p-2 rounded-full cursor-pointer absolute right-4 top-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </Link>

          <img
            className="w-full h-full object-center object-cover"
            src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
            alt=""
          />
        </div>

        <div className="h-1/5 rounded-t-2xl bg-yellow-400 px-5 py-3">
          <div
            className="w-full text-gray-300 flex justify-center items-center cursor-pointer"
            onClick={() => {
              setFinishRidePanelOpen(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </div>
          <div className="w-full mt-2 p-4 flex gap-5 items-center justify-between">
            <p className="text-xl w-2/5 font-semibold">4 KM away</p>
            <button className="p-3 w-3/5 rounded-lg text-white font-semibold bg-green-500">
              Finish Ride
            </button>
          </div>
        </div>

        {/* Finish Ride */}
        <div
          ref={finishRide}
          className="fixed h-screen w-full z-10 bottom-0 translate-y-full bg-white px-3"
        >
          <FinishRide setFinishRidePanelOpen={setFinishRidePanelOpen} />
        </div>
      </div>
    </>
  );
}

export default CaptainRiding;
