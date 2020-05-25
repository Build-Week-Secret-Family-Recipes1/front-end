import axios from "axios";


export const axiosWithAuth = () => {
  const user = localStorage.getItem("user");

  return axios.create({
    baseURL: "https://secretrecipesbuild.herokuapp.com/",
    headers: {
      withCredentials: true,
      user: user
    }
  });
};
