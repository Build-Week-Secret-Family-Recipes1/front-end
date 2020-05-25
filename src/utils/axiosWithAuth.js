import axios from "axios";


export const axiosWithAuth = () => {
  const user = localStorage.getItem("user");

  return axios.create({
    baseURL: "/",
    headers: {
      withCredentials: true,
      user: user
    }
  });
};
