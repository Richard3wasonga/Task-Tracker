import React,{useState} from 'react'

const DisplayTable = ({tasks,setTasks}) => {

  
  const handleDelete = (id) => {
    const removedTasks = tasks.filter(task=> task.id !==id)
    setTasks(removedTasks)

  }
  const handleChecked = (id) =>{
    const doneTasks = tasks.map(task => {
      if(task.id === id){
        return {...task,completed: !task.completed}
      }
      return task
    })
    setTasks(doneTasks)

    const updatedDoneTask = doneTasks.find(task => task.id === id);

    fetch(`https://task-traker-server.vercel.app/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: updatedTask.id,
        title: updatedTask.title,
        completed: updatedDoneTask.completed
       }),
    })
    .then(response =>  response.json())
    .then(data => console.log(data))
    .catch(error => {console.error('Error:', error);});
  };
  
  
  return (
    <div>
        <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleChecked(task.id)} 
                />
              </td>
              <td>
                <button className='editbtn' onClick={onclick}>Edit</button>
                <button className='deletebtn' onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DisplayTable