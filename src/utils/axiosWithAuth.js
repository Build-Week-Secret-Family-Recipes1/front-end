import axios from "axios";


export const axiosWithAuth = () => {
  return axios.create({
    baseURL: "https://secretfamilyrecipesapi.heroku.com/",
    headers: {
      withCredentials: true
    }
  });
};
