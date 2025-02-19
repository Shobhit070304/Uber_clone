import React from "react";
import { Link } from "react-router-dom";

function FinishRide({ setFinishRidePanelOpen }) {
  return (
    <>
      <div className="p-2">
        <div
          className="w-full text-gray-300 flex justify-center items-center mt-2 cursor-pointer"
          onClick={() => {
            setFinishRidePanelOpen(false);
          }}
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
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold">Finish this ride</h1>
        <div className="flex items-center mt-8 justify-between bg-yellow-300 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <img
              className="w-10 rounded-full object-center"
              src="data:image/jpeg;base64,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"
              alt=""
            />
            <p className="text-lg font-semibold">Bob Sharma</p>
          </div>
        </div>
        <div className="p-2 border-gray-400">
          <div className="w-full border-b-2 border-gray-200 mb-1 p-2 flex gap-3 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>

            <div>
              <p className="text-lg font-semibold">562/11-A</p>
              <p className="text-sm text-gray-500">Lajpat Nagar, Delhi</p>
            </div>
          </div>
          <div className="w-full border-b-2 border-gray-200 mb-1 p-2 flex gap-3 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>

            <div>
              <p className="text-lg font-semibold">42/11-A</p>
              <p className="text-sm text-gray-500">Patel Nagar, Delhi</p>
            </div>
          </div>

          <div className="w-full border-b-2 border-gray-200 mb-1 p-2 flex gap-3 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"
                clipRule="evenodd"
              />
            </svg>

            <div>
              <p className="text-lg font-semibold">$193.45</p>
              <p className="text-sm text-gray-500">Amount</p>
            </div>
          </div>

          <form>
            <Link
              to={"/captain-home"}
              className="w-full block text-center mt-6 mb-2 bg-green-500 text-white p-2 rounded-lg font-semibold"
            >
              Finish Ride
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default FinishRide;
