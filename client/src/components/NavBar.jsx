import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar (){
  const {isAuthenticated, logout, user}= useAuth()
  return (
   <nav>
    <h1>Task Manager</h1>
    {isAuthenticated ? ( <>
        <ul>
        <li>
          Welcome {user.username}
        </li>
        <li>
          <Link to="/tasks/new">Add Task</Link>
        </li>
        <li>
          <Link to="/" onClick={()=>{logout()}}>Logout</Link>
        </li>
      </ul>
      </>):(
        <>
        <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
      </>)
}
   </nav>
  )
}

export default Navbar