import {useForm} from "react-hook-form"
import { useTasks } from "../context/TaskContext"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"


function TaskFormPage(){
  const {register, handleSubmit, setValue}= useForm()
  const {createTask, getTask, updateTask}= useTasks()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(()=>{
    async function loadTask(){
      if(params.id){
        const task = await getTask(params.id)
        setValue("title", task.title)
        setValue("description", task.description)
      }
    }
    loadTask()
  },[])

  const onSubmit = handleSubmit((data)=>{
    if(params.id){
     updateTask(params.id, data)
    }else{
      createTask(data);
    }
    navigate('/tasks')
  })
  return(
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Title" {...register("title")} autoFocus/>
        <textarea rows="3" placeholder="description" {...register("description")}></textarea>
        <button>Save</button>
      </form>
    </div>
  )
}

export default TaskFormPage