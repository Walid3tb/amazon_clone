"use client";
import React, { useEffect, useState } from "react";
import services from "@/services";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const ChildrenList = () => {
  const authToken = Cookies.get("token");
  const [userChildren, setUserChildren] = useState<any[]>([]);

  useEffect(() => {
    const fetchChildren = async () => {
      const childrenData = await services.getUserChildren();
      setUserChildren(childrenData.children);
    };
    fetchChildren();
  }, []);

  const handlePickup = async (formData: {
    schoolId: string;
    childId: string;
  }) => {
    console.log(formData);

    const response = await services.createPickup(formData);
    if (response.message) {
      toast.error(response.message);
    } else {
      toast.success("Pick up request Done");
    }
  };

  return (
    <div>
      <Toaster />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
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
                School Id
              </th>
              <th scope="col" className="px-6 py-3">
                User Id
              </th>
              <th scope="col" className="px-6 py-3">
                Action
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
                  <td className="px-6 py-4">{item?.schoolId}</td>
                  <td className="px-6 py-4">{item?.userId}</td>
                  <td className="px-6 py-4">
                    {!item?.status ? (
                      <button
                        className="font-medium text-blue-600 "
                        onClick={() =>
                          handlePickup({
                            schoolId: item?.schoolId,
                            childId: item?._id,
                          })
                        }
                      >
                        Pick up
                      </button>
                    ) : item?.status === "0" ? (
                      <button className="font-medium text-blue-600 ">
                        On the way
                      </button>
                    ) : (
                      <button className="font-medium text-blue-600 ">
                        Arrived
                      </button>
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

export default ChildrenList;
