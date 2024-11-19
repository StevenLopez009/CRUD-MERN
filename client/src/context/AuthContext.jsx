import {  createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth"
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
  const [loading, setLoading ]= useState(false)

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
      console.log(error)
      if(Array.isArray(error.response.data)){
        return setErrors(error.response.data)
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
   async function checkLogin (){
    const cookies= Cookies.get()
    console.log(cookies);
    if(!cookies.token){
      console.log("Token no encontrado en las cookies");
      setIsAuthenticated(false)
      setLoading(false)
      setUser(null)
      return;
    }
      try {
        const res =await verifyTokenRequest(cookies.token)
        if(!res.data){
          setIsAuthenticated(false);
          setLoading(false)
          setUser(null);
          return;
        }else{
          setIsAuthenticated(true)
          setUser(res.data)
          setLoading(false)
        } 
      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
      }
   }
   checkLogin()
  },[])
  
  return (
    <AuthContext.Provider value={{signup,signin,loading, user, isAuthenticated, errors}}>
      {children}
    </AuthContext.Provider>
  )
}