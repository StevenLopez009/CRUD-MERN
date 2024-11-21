import { Link } from "react-router-dom"
import { useTasks } from "../context/TaskContext"

function TaskCard({task}){
  const {deleteTask}= useTasks()
  return (
    <div>
      <h1>{task.title}</h1>
      <button onClick={()=>{deleteTask(task._id)}}>Delete</button>
      <Link to={`/tasks/${task._id}`}>Edit</Link>
      <p>{task.description}</p>
    </div>
  )
} 

export default TaskCard