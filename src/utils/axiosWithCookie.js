import axios from "axios";
import axiosCookieJarSupport from 'axios-cookiejar-support';
import tough from 'tough-cookie';

export const axiosWithCookie = () => {
  const instance = axios.create({
    baseURL: "https://secretrecipesbuild.herokuapp.com/",
    headers: {
      withCredentials: true
    }
  });
  // Set directly after wrapping instance.
  axiosCookieJarSupport(instance);
  instance.defaults.jar = new tough.CookieJar();

  return instance;
};
