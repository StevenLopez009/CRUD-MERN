import {  createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest } from "../api/auth"

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
    } catch (error) {
      setErrors(error.response.data)
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

  return (
    <AuthContext.Provider value={{signup,signin, user, isAuthenticated, errors}}>
      {children}
    </AuthContext.Provider>
  )
}