"use client";
import LoadingIndicator from "@/components/LoadingIndicator";
import services from "@/services";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const MyAccountPage = () => {
  const cookieUser = Cookies.get("user") || "{}";
  const authUser = JSON.parse(cookieUser);
  const [dataLoading, setDataLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await services.getUserDetails(authUser?.id);

      setUserInfo(data.user);
      setDataLoading(false);
    };
    fetchUserData();
  },[]);

  return (
    <div className="max-w-6xl mx-auto w-full pt-5">
      <h2 className="text-3xl font-bold text-center py-4">My Account</h2>
      <div>
        {userInfo ? (
          <div className="flex flex-col gap-1 max-w-5xl mx-auto">
            <p className="text-2xl font-medium capitalize pt-4 pb-2">
              <span className="">{userInfo.fullName}</span>
            </p>
            <p className="text-base">
              <span className="font-medium">ID: </span>
              {userInfo.identity}
            </p>
            <p className="text-base">
              <span className="font-medium">Email: </span>
              {userInfo.email}
            </p>
            <p className="text-base">
              <span className="font-medium">Phone: </span>
              {userInfo.phone}
            </p>
          </div>
        ) : (
          <LoadingIndicator />
        )}
      </div>
      <div className="py-8">
        <h4 className="text-2xl font-medium">Child List: </h4>
        {dataLoading ? (
          <LoadingIndicator />
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
            {userInfo?.Children.length > 0 ? (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Identity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      School Name
                    </th>
                    {}
                  </tr>
                </thead>
                <tbody>
                  {userInfo?.Children?.length > 0 &&
                    userInfo?.Children.map((item: any) => (
                      <tr className="bg-white border-b" key={item?._id}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item?.fullName}
                        </th>
                        <td className="px-6 py-4">{item?.identity}</td>
                        <td className="px-6 py-4">{item?.schoolId?.name}</td>
                        {}
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
    </div>
  );
};

export default MyAccountPage;
