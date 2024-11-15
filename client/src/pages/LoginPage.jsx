import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function LoginPage (){
  const {register, handleSubmit, formState:{errors}}= useForm();
  const {signin, errors: signinErrors}= useAuth()

  const onSubmit= handleSubmit((data)=>{
    signin(data)
  })
  return (
    <div>
      <div>
      {signinErrors.map((error,i)=>(
          <div key={i}>
            {error}
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit}>
      <input type="email" {...register("email",{required:true})} placeholder="Email"/>
      <input type="password" {...register("password",{required:true})} placeholder="Password"/>
      <button type="submit">Login</button>
      <p>Don't have an account <Link></Link> </p>
  </form>
  </div>
  )
}

export default LoginPage