import Cookies from "js-cookie";
import { CHILDREN_API, FEEDBACK_API, TRACK_API, USER_API } from "./apiConfig";
const token = Cookies.get("token");

const fetchContactUs = async (formData: any) => {
  const response = await fetch(FEEDBACK_API.CREATE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
};

const getAllTracksForSchool = async () => {
  const response = await fetch(TRACK_API.GET_ALL_FOR_SCHOOL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

//Get All Student add request:
const getAllRequest = async () => {
  const response = await fetch(TRACK_API.GET_ALL_FATHER_REQ, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

const getUserChildren = async () => {
  const response = await fetch(CHILDREN_API.USER_CHILDREN, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};
const getAllUserTracks = async (statusFilter: string) => {
  const response = await fetch(TRACK_API.GET_ALL_USER_TRACKS + statusFilter, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

//Get User Details: Single User
const getUserDetails = async (userId: string) => {
  const response = await fetch(USER_API.SINGLE(userId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

const addChildren = async (formData: any) => {
  const response = await fetch(CHILDREN_API.CREATE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
};

//Create Pick up for child:
const createPickup = async (formData: any) => {
  const response = await fetch(TRACK_API.CREATE_PICKUP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
};

//Arrived Request:::
const arrivedRequest = async (formData: any) => {
  const response = await fetch(TRACK_API.ARRIVED_REQUEST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
};

//Picked up request:
const pickedUpRequest = async (formData: any) => {
  const response = await fetch(TRACK_API.PICKED_UP_REQUEST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
};

//accept requested child
const acceptReqChild = async (formData: any) => {
  const response = await fetch(TRACK_API.ACCEPT_REQ_CHILD, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
};
const rejectReqChild = async (formData: any) => {
  const response = await fetch(TRACK_API.REJECT_REQ_CHILD, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
};

const services = {
  fetchContactUs,
  getAllTracksForSchool,
  getUserChildren,
  addChildren,
  createPickup,
  getAllUserTracks,
  arrivedRequest,
  pickedUpRequest,
  getUserDetails,
  getAllRequest,
  acceptReqChild,
  rejectReqChild,
};
export default services;
