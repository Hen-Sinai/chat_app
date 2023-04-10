import axios from "axios";
import { serverAddress } from "../../config/ipAddress";
// import { SERVER_ADDRESS } from "@env";

export const signup = async (phoneNumber, name) => {
  return await axios.post(`${serverAddress}/auth/register`, {
    phoneNumber,
    name,
  });
};

export const login = async (phoneNumber) => {
  return await axios.post(`${serverAddress}/auth/login`, {
    phoneNumber,
  });
};

export const addUserInfo = async (token, about) => {
  console.log('about', about)
  return await axios.patch(
    `${serverAddress}/users`,
    {
      about,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
