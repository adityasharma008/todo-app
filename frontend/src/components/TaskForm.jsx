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
      <form className="flex mb-8 rounded-lg overflow-hidden shadow-md bg-white border border-gray-300 task-form" onSubmit={handleSubmit}>
         <input 
            type="text"
            placeholder="e.g. wash dishes"
            name="new-task"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="flex-1 px-5 py-3 text-base border-r border-gray-200 outline-none bg-[#f9f9f9] text-[#333] placeholder:text-[#999] task-input"
         />
         <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-base font-medium submit-button transition border-l border-gray-200">Add Task</button>
      </form>
   )
}