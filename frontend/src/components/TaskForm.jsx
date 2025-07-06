import { useState } from "react"

export default function TaskForm({addTask}) {
   const [taskTitle, setTaskTitle] = useState("")

   function handleSubmit(e) {
      e.preventDefault()
      if (!taskTitle.trim()) return

      addTask(taskTitle);
      setTaskTitle("")
   }

   return (
      <form className="task-form" onSubmit={handleSubmit}>
         <input 
            type="text"
            placeholder="e.g. wash dishes"
            name="new-task"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
         />
         <button>Add Task</button>
      </form>
   )
}