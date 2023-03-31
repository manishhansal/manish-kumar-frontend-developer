import React, { useEffect, useState } from "react";

const CapsulePopup = ({ showPopupId, handleClosePopup }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchCapsulesDetails = async () => {
      const res = await fetch(
        `https://api.spacexdata.com/v3/capsules/${showPopupId}`
      );
      const data = await res.json();
      setData(data);
    };

    fetchCapsulesDetails();
  }, [showPopupId]);

  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-1 rounded-lg w-1/3">
        <article className="bg-stone-900 p-5 rounded-lg shadow shadow-zinc-800 text-white text-sm">
          <h2 className="text-xl font-bold mb-5 text-center">
            {data?.type},{" "}
            <span className="text-base opacity-75 font-light">
              {data?.capsule_serial}
            </span>
          </h2>
          <ul>
            <li className="mb-1">{data?.missions?.length} missions</li>
            <li className="mb-1">{data?.land_landings} land landings</li>
            <li className="mb-1">{data?.water_landings} water landings</li>
            <li className="mb-1">Reused {data?.reuse_count} times</li>
            {data?.status === "active" ? (
              <li className="text-emerald-500">Active</li>
            ) : (
              <li className="text-rose-500">Retired</li>
            )}
          </ul>

          <p className="mt-5 opacity-75">{data?.last_update}</p>
        </article>
        <br />
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClosePopup}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CapsulePopup;
