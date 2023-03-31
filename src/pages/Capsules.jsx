import React, { useEffect, useMemo, useState } from "react";
import CapsulePopup from "../components/CapsulePopup";
import Pagination from "../components/pagination/Pagination";

const PageSize = 6;

const Capsules = () => {
  const [capsules, setCapsules] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchStatusValue, setSearchStatusValue] = useState("");
  const [searchOriginalLaunchValue, setSearchOriginalLaunchValue] =
    useState("");
  const [searchTypeValue, setSearchTypeValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupId, setShowPopupId] = useState(null);

  useEffect(() => {
    const fetchCapsules = async () => {
      const res = await fetch("https://api.spacexdata.com/v3/capsules");
      const data = await res.json();
      setCapsules(data);
      setSearchResult(data);
    };

    fetchCapsules();
  }, []);

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return searchResult?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, searchResult]);

  const handleSearch = () => {
    const filteredCapsules = capsules.filter((capsule) => {
      const status =
        capsule?.status
          ?.toLowerCase()
          ?.indexOf(searchStatusValue?.toLowerCase()) > -1;
      const originalLaunch =
        capsule?.original_launch
          ?.toLowerCase()
          ?.indexOf(searchOriginalLaunchValue?.toLowerCase()) > -1;
      const type =
        capsule?.type?.toLowerCase()?.indexOf(searchTypeValue?.toLowerCase()) >
        -1;

      return status && originalLaunch && type;
    });

    setSearchResult(filteredCapsules);
  };

  const handleShowPopup = (id) => {
    setShowPopupId(id);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopupId(null);
    setShowPopup(false);
  };

  return (
    <>
      <div className="capsules-container py-32">
        <h1 className="text-white font-bold text-4xl md: text-5xl xl:text-6xl text-center mb-10">
          Capsules
        </h1>

        {/* Search */}
        <div className="flex justify-center w-full">
          <div className="rounded-md shadow-sm gap-5 mb-5 md:flex">
            <input
              type="text"
              className="py-2 px-3 pr-11 block w-sm border-gray-200 shadow-sm rounded text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Search by status"
              value={searchStatusValue}
              onChange={(e) => setSearchStatusValue(e.target.value)}
            />
            <br />
            <input
              type="text"
              className="py-2 px-3 pr-11 block w-sm border-gray-200 shadow-sm rounded text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Search by original lunch"
              value={searchOriginalLaunchValue}
              onChange={(e) => setSearchOriginalLaunchValue(e.target.value)}
            />

            <br />

            <input
              type="text"
              className="py-2 px-3 pr-11 block w-sm border-gray-200 shadow-sm rounded text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Search by type"
              value={searchTypeValue}
              onChange={(e) => setSearchTypeValue(e.target.value)}
            />

            <br />
            <button
              type="button"
              className="py-[.688rem] px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 transition-all text-sm dark:border-gray-700 dark:hover:border-blue-500"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
          {currentData.map(
            ({
              id,
              type,
              status,
              capsule_serial,
              missions,
              last_update,
              land_landings,
              water_landings,
              reuse_count,
            }) => (
              <article
                key={id}
                className="bg-stone-900 p-5 rounded-lg shadow shadow-zinc-800 text-white text-sm cursor-pointer hover:shadow-zinc-900 transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleShowPopup(capsule_serial)}
              >
                <h2 className="text-xl font-bold mb-5">
                  {type},{" "}
                  <span className="text-base opacity-75 font-light">
                    {capsule_serial}
                  </span>
                </h2>
                <ul>
                  <li className="mb-1">{missions?.length} missions</li>
                  <li className="mb-1">{land_landings} land landings</li>
                  <li className="mb-1">{water_landings} water landings</li>
                  <li className="mb-1">Reused {reuse_count} times</li>

                  {status === "active" ? (
                    <li className="text-emerald-500">Active</li>
                  ) : status === "retired" ? (
                    <li className="text-rose-500">Retired</li>
                  ) : status === "unknown" ? (
                    <li className="text-amber-100">Unknown</li>
                  ) : (
                    <li className="text-500">{status}</li>
                  )}
                </ul>

                <p className="mt-5 opacity-75">{last_update}</p>
              </article>
            )
          )}
        </div>
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={searchResult.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {showPopup && (
        <CapsulePopup
          showPopupId={showPopupId}
          handleClosePopup={handleClosePopup}
        />
      )}
    </>
  );
};

export default Capsules;
