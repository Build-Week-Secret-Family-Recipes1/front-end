import React, {useEffect} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import { isDev } from "../utils/isDev";
import { logoutUser } from "../actions";

export default function Logout({history, func}) {

  useEffect(()=>{
    const user = localStorage.getItem("user");
    localStorage.removeItem("user");
    if (isDev()) {
      logoutUser(user);
    } else {
      axiosWithAuth()
        .get('logout')
        .then(res=>console.log(res))
        .catch(err => console.log(err.message))
    }
    func();
    history.push("/");
  },[history, func])

  return (
    <div></div>
  );
};
