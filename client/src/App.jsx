import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import TaskPage from "./pages/TaskPage"
import TaskFormPage from "./pages/TaskFormPage"
import ProfilePage from "./pages/ProfilePage"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./ProtectedRoute"
import { TaskProvider } from "./context/TaskContext"
import Navbar from "./components/NavBar"

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          
          <Route element={<ProtectedRoute/>}>
            <Route path="/tasks" element={<TaskPage/>}/>
            <Route path="/tasks/new" element={<TaskFormPage/>}/>
            <Route path="/tasks/:id" element={<TaskFormPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
          </Route>
        </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider> 
  )
}

export default App
