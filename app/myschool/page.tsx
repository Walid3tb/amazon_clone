"use client";
import services from "@/services";
import React, { useEffect, useState } from "react";

const MySchoolPage = () => {
  const [tracksData, setTracksData] = useState<any[]>([]);
  useEffect(() => {
    const fetchAllTrack = async () => {
      const data = await services.getAllTracksForSchool();
      console.log(data);
      const newArr = [...data.inTheWay, ...data.arrived];
      setTracksData(newArr);
    };
    fetchAllTrack();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h4 className="pt-5 font-bold text-2xl">Students: </h4>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Student Name
              </th>
              <th scope="col" className="px-6 py-3">
                Father Name
              </th>
              <th scope="col" className="px-6 py-3">
                Father Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {tracksData?.length > 0 &&
              tracksData.map((item: any) => (
                <tr className="bg-white border-b" key={item?._id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item?.childId?.fullName}
                  </th>
                  <td className="px-6 py-4">{item?.userId?.fullName}</td>
                  <td className="px-6 py-4">{item?.userId?.phone}</td>
                  <td className="px-6 py-4">
                    {item?.status === "1" ? (
                      <span className="text-green-700 bg-green-200/50 font-medium py-1 px-2 rounded-lg">
                        Arrived
                      </span>
                    ) : (
                      <span className="text-blue-700 bg-blue-200/50 font-medium py-1 px-2 rounded-lg">
                        In the way
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySchoolPage;
