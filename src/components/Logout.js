import React, {useEffect} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';

export default function Logout({history, func}) {

  useEffect(()=>{
    localStorage.removeItem("user");
    axiosWithAuth()
      .get('logout')
      .then(res=>console.log(res))
      .catch(err => console.log(err.message))
    func();
    history.push("/");
  },[history, func])

  return (
    <div></div>
  );
};
