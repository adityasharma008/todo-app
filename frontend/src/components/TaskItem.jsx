import { useState } from "react"

export default function TaskItem({task, deleteTask, toggleComplete, editTask}) {
   const [isEditing, setIsEditing] = useState(false)
   const [newName, setNewName] = useState(task.taskName)

   function handleEdit() {
      if (isEditing && newName.trim() !== '') {
         editTask(task._id, newName)
      }
      setIsEditing(!isEditing)
   }

   function handleKeyDown(e) {
      if(e.key === 'Enter') {
         handleEdit()
      }
   }

   return (
      <li className={`flex justify-between items-center bg-[#fdfdfd] border-2 border-gray-200 rounded-lg mb-4 px-5 py-4 text-[1.1em] text-[#444] shadow-[0_-2px_8px_0_rgba(0,0,0,0.08),0_-1.5px_0_0_rgba(0,0,0,0.04)] transition-all duration-200 task-item ${task.completed ? 'completed' : ''} ${!isEditing ? 'hover:-translate-y-0.5 hover:shadow-lg' : ''}`}> 
         {  isEditing? (
         <input 
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 px-3 py-2 border border-[#ccc] rounded-md text-base outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] mr-3 edit-task-input"
         />
         ) : (
         <span onClick={() => toggleComplete(task._id, task.completed)} className="flex-1 text-left cursor-pointer select-none task-name">
            {task.taskName}
            </span>
         )}
         <div className="flex gap-2 task-actions">
           <button onClick={handleEdit} className="icon-button edit-button rounded-full p-2 hover:bg-gray-200 transition" title="Edit">
             <svg fill="none" stroke="#3b82f6" strokeWidth="2.2" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414 1.414-4.243a4 4 0 01.828-1.414z"/></svg>
           </button>
           <button onClick={() => deleteTask(task._id)} className="icon-button delete-button rounded-full p-2 hover:bg-red-100 transition" title="Delete">
             <svg fill="none" stroke="#dc2626" strokeWidth="2.2" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
           </button>
         </div>
      </li>
   )
}


