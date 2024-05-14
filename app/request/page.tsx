"use client";
import LoadingIndicator from "@/components/LoadingIndicator";
import services from "@/services";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const RequestPage = () => {
  const [requestData, setRequestData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [fetchDataInd, setFetchDataInd] = useState(false);
  useEffect(() => {
    const fetchAllReq = async () => {
      const data = await services.getAllRequest();

      setRequestData(data.children);
      setDataLoading(false);
    };
    fetchAllReq();
  }, [fetchDataInd]);
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Toaster />
      <h4 className="pt-5 font-bold text-2xl">Requests: </h4>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
        {requestData?.length > 0 ? (
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
                  Actions
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
                requestData?.length > 0 &&
                requestData.map((item: any) => (
                  <tr className="bg-white border-b" key={item?._id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item?.fullName}
                    </th>
                    <td className="px-6 py-4">{item?.userId?.fullName}</td>
                    <td className="px-6 py-4">{item?.userId?.phone}</td>
                    <td className="px-6 py-4 flex items-center justify-start gap-4">
                      <button
                        onClick={async () => {
                          const response = await services.acceptReqChild({
                            childId: item?._id,
                          });
                          if (response.child) {
                            toast.success("Request Accepted!!!");
                          } else {
                            toast.error("Operation failed!!!");
                          }
                          setFetchDataInd(!fetchDataInd);
                        }}
                        className="text-green-600 bg-green-200/50 px-2 py-1 rounded-md font-medium"
                      >
                        Accept
                      </button>
                      <button
                        onClick={async () => {
                          const response = await services.rejectReqChild({
                            childId: item?._id,
                          });
                          if (response.child) {
                            toast.success("Request Rejected!!!");
                          } else {
                            toast.error("Operation failed!!!");
                          }
                          setFetchDataInd(!fetchDataInd);
                        }}
                        className="text-red-600 bg-red-200/50 px-2 py-1 rounded-md font-medium"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <div>
            <h4 className="text-center">No Requests Exist!!!</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestPage;
