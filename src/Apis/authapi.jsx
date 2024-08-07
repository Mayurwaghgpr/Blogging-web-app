import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; // add '/' after BASE_URL

export const LoginUser = async (loginInfo) => {
  try {
    const result = await axios.post(`${BASE_URL}/auth/Login`, loginInfo, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const RegisterUser = async (SignUpInfo) => {
  try {
    const result = await axios.put(`${BASE_URL}/auth/SignUp`, SignUpInfo, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    throw new Error(error.response);
  }
};
