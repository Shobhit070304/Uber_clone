import React from "react";

function LocationSearchPanel({ setPanelOpen, setVechileOpen }) {
  const locations = [
    "123 Main St, Anytown, USA",
    "456 Elm St, New York, USA",
    "789 Oak Ave, Los Angeles, USA",
    "1234 Parkway, Chicago, USA",
    "567 Maple St, San Francisco, USA",
  ];

  return (
    <div className="px-5 ">
      {locations.map((loc, idx) => (
        <div
          onClick={() => {
            setVechileOpen(true);
            setPanelOpen(false);
          }}
          key={idx}
          className="flex items-center border-2 p-1 rounded-2xl border-gray-100 active:border-black gap-4 mb-2"
        >
          <div className="p-3 rounded-full bg-[#eee]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-black bg-green">{loc}</div>
        </div>
      ))}
    </div>
  );
}

export default LocationSearchPanel;
