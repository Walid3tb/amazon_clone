"use client";
import React, { useEffect, useState } from "react";
import services from "@/services";
import toast, { Toaster } from "react-hot-toast";
import LoadingIndicator from "@/components/LoadingIndicator";

export const MyTracksPage = () => {
  const [tracksData, setTracksData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [statusFilterData, setStatusFilterData] = useState("");
  const [userChildren, setUserChildren] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState(1);
  const [fetchChildIndicate, setFetchChildIndicate] = useState(false);

  useEffect(() => {
    const filterStatus = statusFilterData.length > 0 ? `?status=${statusFilterData}` : "";
    const fetchTracksData = async () => {
      const data = await services.getAllUserTracks(filterStatus);

      setTracksData(data.tracks);
      setDataLoading(false);
    };
    fetchTracksData();
  }, [dataLoading, statusFilterData]);

  useEffect(() => {
    const fetchChildren = async () => {
      const childrenData = await services.getUserChildren();
      setUserChildren(childrenData?.children);
      setDataLoading(false);
    };
    fetchChildren();
  }, [fetchChildIndicate]);

  const handlePickup = async (formData: {
    schoolId: string;
    childId: string;
  }) => {
    const response = await services.createPickup(formData);
    if (response.status) {
      toast.success(response.message || "Process success");
    } else {
      toast.error(response.message || "Process failed");
    }
    setDataLoading(!dataLoading);
  };
  const handleArrived = async (formData: { trackId: string; }) => {
    const response = await services.arrivedRequest(formData);
    setDataLoading(!dataLoading);
    if (response.newTrack) {
      toast.success(response.message);
    } else {
      toast.error(response.message || "Process failed");
    }
  };
  const handlePickedUp = async (formData: { trackId: string; }) => {
    const response = await services.pickedUpRequest(formData);
    setDataLoading(!dataLoading);
    if (response.newTrack) {
      toast.success(response.message);
    } else {
      toast.error(response.message || "Process failed");
    }
  };
  const handleStatusFilterChange = (event: any) => {
    setStatusFilterData(event.target.value);
    setDataLoading(!dataLoading);
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-2">
      <Toaster />

      <ul className="flex flex-wrap items-center justify-center pt-4 border-b text-sm font-medium text-center text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="me-2 cursor-pointer" onClick={() => setActiveTab(1)}>
          <span
            className={`inline-block p-4  ${activeTab === 1 ? "bg-gray-800" : "bg-gray-100"} rounded-t-lg active `}
          >
            My Students
          </span>
        </li>
        <li className="me-2 cursor-pointer" onClick={() => setActiveTab(2)}>
          <span
            className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${activeTab === 2 ? "bg-gray-800" : "bg-gray-100"}`}
          >
            My Tracks
          </span>
        </li>
      </ul>

      {activeTab === 1 ? (
        <>
          <h2 className="text-2xl font-bold">My Students:</h2>

          <div>
            {dataLoading ? (
              <LoadingIndicator />
            ) : (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
                {userChildren?.length > 0 ? (
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Full Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Identity
                        </th>
                        <th scope="col" className="px-6 py-3">
                          School Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userChildren?.length > 0 &&
                        userChildren.map((item) => (
                          <tr className="bg-white border-b" key={item?._id}>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              {item?.fullName}
                            </th>
                            <td className="px-6 py-4">{item?.identity}</td>
                            {/* <td className="px-6 py-4">{item?.schoolId}</td>*/}
                            <td className="px-6 py-4">
                              {item?.schoolId?.name}
                            </td>
                            <td className="px-6 py-4">
                              {!item?.status ? (
                                <button
                                  className="font-medium text-blue-600 "
                                  onClick={() => handlePickup({
                                    schoolId: item?.schoolId?._id,
                                    childId: item?._id,
                                  })}
                                >
                                  Go
                                </button>
                              ) : item?.status === "0" ? (
                                <button
                                  className="font-medium text-blue-600 "
                                >
                                  On the way
                                </button>
                              ) : (
                                <button
                                  className="font-medium text-blue-600 "
                                >
                                  Arrived
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <div>
                    <h4 className="text-center">No Child Found!!!</h4>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold py-4">My Tracks:</h2>
          <div className="relative max-w-5xl w-full mx-auto sm:rounded-lg my-5">
            <div className="flex justify-end py-4">
              <h4 className="text-lg font-medium">Filter by Status</h4>
              <select
                name="statusFilter"
                id="statusFilter"
                value={statusFilterData}
                onChange={handleStatusFilterChange}
              >
                <option value="0">On the way</option>
                <option value="1">Arrived</option>
              </select>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 overflow-x-auto shadow-md">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Identity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    School Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataLoading ? (
                  <tr>
                    <td colSpan={4}>
                      <LoadingIndicator />
                    </td>
                  </tr>
                ) : (
                  tracksData?.length > 0 &&
                  tracksData
                    .filter((item) => item?.status !== "2")
                    .map((item) => (
                      <tr className="bg-white border-b" key={item?._id}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item?.childId?.fullName}
                        </th>
                        <td className="px-6 py-4">{item?.childId?.identity}</td>
                        <td className="px-6 py-4">{item?.schoolId?.name}</td>
                        <td className="px-6 py-4">
                          {item?.status === "0" ? (
                            <button
                              className="text-blue-700 bg-blue-200/50 font-medium py-1 px-2 rounded-lg"
                              onClick={() => handleArrived({
                                trackId: item?._id,
                              })}
                            >
                              On the way
                            </button>
                          ) : item?.status === "1" ? (
                            <button
                              className="text-green-700 bg-green-200/50 font-medium py-1 px-2 rounded-lg"
                              onClick={() => handlePickedUp({
                                trackId: item?._id,
                              })}
                            >
                              Arrived
                            </button>
                          ) : (
                            <button
                              className="text-green-700 bg-green-200/50 font-medium py-1 px-2 rounded-lg"
                              onClick={() => handlePickedUp({
                                trackId: item?._id,
                              })}
                            >
                              Go
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
