import {  createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest } from "../api/auth"
import Cookies from "js-cookie"


export const AuthContext = createContext()

export const useAuth=()=>{
  const context= useContext(AuthContext)
  if(!context){
    throw new Error ("useAuth must be used within an AuthProvider ")
  }
  return context
}

export const AuthProvider =({children})=>{
  const [user, setUser]= useState(null)
  const [isAuthenticated, setIsAuthenticated]= useState(false)
  const [errors, setErrors]= useState([])

  const signup =async (user)=>{
    try {
      const res = await registerRequest(user)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  const signin = async (user)=>{
    try {
      const res = await loginRequest(user)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      if(Array.isArray(error.response.data)){
        setErrors(error.response.data)
      }else{
        setErrors([error.response.data.message])
      }
    }
  }

  useEffect(()=>{
    if(errors.length >0 ){
      const timer=setTimeout(() => {
        setErrors([])
      }, 5000);
      return()=>clearTimeout(timer)
    }
  },[errors])

  useEffect(()=>{
    const cookies= Cookies.get()
    if(cookies.token){
      console.log(cookies.token)
    }
  },[])

  return (
    <AuthContext.Provider value={{signup,signin, user, isAuthenticated, errors}}>
      {children}
    </AuthContext.Provider>
  )
}