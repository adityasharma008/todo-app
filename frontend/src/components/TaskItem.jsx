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
      <li className={`${task.completed? 'completed': ''}`}>
         {  isEditing? (
         <input 
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            autoFocus
         />
         ) : (
         <span onClick={() => toggleComplete(task._id, task.completed)} >
            {task.taskName}
            </span>
         )}
         <button onClick={handleEdit}>edit</button>
         <button onClick={() => deleteTask(task._id)}>delete</button>
      </li>
   )
}


