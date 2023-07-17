import React, { useContext, useEffect, useState } from "react";
import AppRouter from "./components/Approuter";
import { ReactDOM } from "react";
import NavBar from "./components/Navbar";
import { Context } from ".";
import { check } from "./http/userAPI";
export function App() {
  const {user}=useContext(Context)
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    if(localStorage.getItem('token')){
    check().then(data=>{
      setLoading(true)
      user.setUser(data)
      user.setIsAuth(true)
    }).catch((e)=>{setLoading(false)
      alert('Сервер в данный момент недоступен')})
  }
    else{
      setLoading(true)
    } 
  },[])

  if(loading)
  return <>
   <NavBar></NavBar>
  <AppRouter></AppRouter></>
}

export default App;
