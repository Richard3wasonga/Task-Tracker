import React,{useState} from 'react'

const AddForm = ({tasks,onAddTask}) => {
    const [newTask, setnewTask] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const lastId = tasks.length > 0 ? parseInt(tasks[tasks.length - 1].id) : 0;
        const newId = (lastId + 1).toString();

        const newtask ={
            id: newId,
            title : newTask,
            completed : false,
        }
        
        onAddTask(newtask)
        setnewTask('')
    }
    const handleNewTask = (e) => {
        setnewTask(e.target.value)
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='text'className='addinput' placeholder='Add task' value={newTask} onChange={handleNewTask}/>
            <button className='addbtn' type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default AddForm