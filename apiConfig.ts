export const BASE_URL = `https://weselt-backend.vercel.app/api`;

export const AUTH_API = {
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  SEND_RESET_PASS_LINK: `${BASE_URL}/auth/reset-password-link`,
  RESET_PASSWORD: (userId: string, token: string) =>
    `${BASE_URL}/auth/reset-password/${userId}/${token}`,
};

export const USER_API = {
  ALL: `${BASE_URL}/users/profile`,
  COUNT: `${BASE_URL}/users/count`,
  SINGLE: (id: string) => `${BASE_URL}/users/profile/${id}`,
  UPDATE: (id: string) => `${BASE_URL}/cities/:${id}`,
  DELETE: (id: string) => `${BASE_URL}/cities/:${id}`,
};

export const CITY_API = {
  ALL: `${BASE_URL}/cities`,
  CREATE: `${BASE_URL}/cities/create`,
  SINGLE: (id: string) => `${BASE_URL}/cities/:${id}`,
  UPDATE: (id: string) => `${BASE_URL}/cities/:${id}`,
  DELETE: (id: string) => `${BASE_URL}/cities/:${id}`,
};

export const SCHOOL_API = {
  ALL: `${BASE_URL}/schools`,
  CITY_SCHOOL: (cityId: string) => `${BASE_URL}/schools?cityid=${cityId}`,
  CREATE: `${BASE_URL}/schools/create`,
  SINGLE: (id: string) => `${BASE_URL}/schools/:${id}`,
  UPDATE: (id: string) => `${BASE_URL}/schools/:${id}`,
  DELETE: (id: string) => `${BASE_URL}/schools/:${id}`,
};

export const CHILDREN_API = {
  ALL: `${BASE_URL}/children`,
  CREATE: `${BASE_URL}/children/create`,
  SINGLE: (id: string) => `${BASE_URL}/children/:${id}`,
  DELETE: (id: string) => `${BASE_URL}/children/:${id}`,
  USER_CHILDREN: `${BASE_URL}/users/children`,
};

export const FEEDBACK_API = {
  CREATE: `${BASE_URL}/feedbacks/create`,
};

export const TRACK_API = {
  GET_ALL_FOR_SCHOOL: `${BASE_URL}/tracks/school/myschool`,
  CREATE_PICKUP: `${BASE_URL}/tracks/create`,
  GET_ALL_USER_TRACKS: `${BASE_URL}/tracks/my`,
  ARRIVED_REQUEST: `${BASE_URL}/tracks/arrived`,
  PICKED_UP_REQUEST: `${BASE_URL}/tracks/done`,
  GET_ALL_FATHER_REQ: `${BASE_URL}/children/school/fathers-requests`,
  ACCEPT_REQ_CHILD: `${BASE_URL}/children/school/accept`,
  REJECT_REQ_CHILD: `${BASE_URL}/children/school/reject`,
};
