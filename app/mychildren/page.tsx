"use client";
import Cookies from "js-cookie";
import { CITY_API, SCHOOL_API } from "@/apiConfig";
import services from "@/services";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoadingIndicator from "@/components/LoadingIndicator";
const MyChildrenPage = () => {
  const cookieUser = Cookies.get("user") || "{}";
  const authUser = JSON.parse(cookieUser);
  const [cities, setCities] = useState<any[]>([]);
  const [cityId, setCityId] = useState("");
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userChildren, setUserChildren] = useState<any[]>([]);
  const [formInputError, setFormInputError] = useState({
    fullName: "",
    id: "",
    cityId: "",
    schoolId: "",
  });

  const [childFormData, setChildFormData] = useState({
    fullName: "",
    identity: "",
    schoolId: "",
  });
  const [fetchChildIndicate, setFetchChildIndicate] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {
    fetchCities();
  }, []);

  //Fetch Children list
  useEffect(() => {
    const fetchChildren = async () => {
      // const childrenData = await services.getUserChildren();
      const data = await services.getUserDetails(authUser?.id);
      setUserChildren(data?.user?.Children);
      setDataLoading(false);
    };
    fetchChildren();
  },[fetchChildIndicate]);

  useEffect(() => {
    if (cityId) {
      fetchSchools(cityId);
    }
  }, [cityId]);

  const fetchCities = async () => {
    try {
      const response = await fetch(CITY_API.ALL);

      if (!response.ok) {
        throw new Error("Something went wrong..");
      }
      const data = await response.json();

      setCities(data.cities);
    } catch (error) {
      toast.error("Error fetching cities. Please try again.");
    }
  };
  //Get Schools in selected city:::
  const fetchSchools = async (id: string) => {
    try {
      const response = await fetch(`${SCHOOL_API.ALL}?cityid=${id}`);

      if (!response.ok) {
        throw new Error("Something went wrong..");
      }
      const data = await response.json();
      console.log(data);

      setSchools(data.schools);
    } catch (error) {
      toast.error("Error fetching cities. Please try again.");
    }
  };
  const handleChange = (e: any) => {
    setChildFormData({ ...childFormData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (
      childFormData.fullName &&
      childFormData.schoolId &&
      childFormData.identity.length === 10
    ) {
      const response = await services.addChildren(childFormData);
      if (!response.child) {
        toast.error(response.message);
      }
      toast.success(response.message);
      setFetchChildIndicate(!fetchChildIndicate);
      setChildFormData({ fullName: "", identity: "", schoolId: "" });
    } else {
      toast.error("Give right input");
    }
    setLoading(false);
  };

  // Handle Child Pick up
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
    <div className="container py-4">
      <Toaster />

      <form
        className="flex flex-col max-w-3xl mx-auto w-full justify-center items-center gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold py-4 text-start">Add Student</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Full Name
            </span>
            <input
              name="fullName"
              className="border-2 rounded-md p-2 shadow focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400 w-full"
              type="text"
              placeholder="Full name"
              onChange={handleChange}
              value={childFormData.fullName}
              required
              onInvalid={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  fullName: e.target.validationMessage,
                })
              }
              onInput={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  fullName: "",
                })
              }
            />
            <span style={{ color: "red" }} className="block">
              {formInputError.fullName}
            </span>
          </label>
          {}
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">ID</span>
            <input
              name="identity"
              className="border-2 rounded-md p-2 shadow focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400 w-full"
              type="text"
              placeholder="ID"
              onChange={handleChange}
              value={childFormData.identity}
              required
              maxLength={10}
              minLength={10}
              onInvalid={(e: any) => {
                if (e.target.validity.tooShort) {
                  e.target.setCustomValidity(
                    "ID must be at least 10 characters"
                  );
                } else if (e.target.validity.tooLong) {
                  e.target.setCustomValidity(
                    "ID must be at most 10 characters"
                  );
                }
                setFormInputError({
                  ...formInputError,
                  id: e.target.validationMessage,
                });
              }}
              onInput={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  id: "",
                })
              }
            />
            <span style={{ color: "red" }} className="block">
              {formInputError.id}
            </span>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              City
            </span>
            <select
              name="cityId"
              onChange={(e: any) => {
                console.log(e.target.value);

                setCityId(e.target.value);
              }}
              // value={cityId}
              required
              onInvalid={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  cityId: e.target.validationMessage,
                })
              }
              onInput={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  cityId: "",
                })
              }
              className="border-2 rounded-md p-2 shadow focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400 w-full bg-white"
            >
              <option value="">Select a City</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
            <span style={{ color: "red" }} className="block">
              {formInputError.cityId}
            </span>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              School
            </span>
            <select
              name="schoolId"
              onChange={handleChange}
              // value={childFormData.schoolId}
              required
              // onClick={() => fetchSchools(cityId)}
              onInvalid={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  schoolId: e.target.validationMessage,
                })
              }
              onInput={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  schoolId: "",
                })
              }
              className="border-2 rounded-md p-2 shadow focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400 w-full bg-white"
            >
              <option value="">Select a school</option>
              {schools.map((school) => (
                <option key={school._id} value={school._id}>
                  {school.name}
                </option>
              ))}
            </select>
            <span style={{ color: "red" }} className="block">
              {formInputError.schoolId}
            </span>
          </label>
        </div>
        <button
          className="bg-sky-600 text-white text-lg py-2 px-16 rounded-md font-bold"
          type="submit"
        >
          {loading ? "Loading..." : "Add Student"}
        </button>
      </form>
      <h2 className="text-2xl font-bold">My Students:</h2>

      <div>
        <Toaster />
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
                    {}
                    <th scope="col" className="px-6 py-3">
                      School Name
                    </th>
                    {}
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
                        {}
                        <td className="px-6 py-4">{item?.schoolId?.name}</td>
                        {}
                        <td className="px-6 py-4 text-xs font-medium">
                          {item?.status === "1" ? (
                            <span className="text-green-600 bg-green-200/75 py-1 px-2 rounded-lg">
                              Accepted
                            </span>
                          ) : item?.status === "2" ? (
                            <span className="text-red-800 bg-red-200/75 py-1 px-2 rounded-lg">
                              Rejected
                            </span>
                          ) : (
                            <span className="text-orange-600 bg-orange-200/75 py-1 px-2 rounded-lg">
                              Waiting
                            </span>
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
    </div>
  );
};

export default MyChildrenPage;
