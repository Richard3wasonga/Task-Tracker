import React from 'react'

const DisplayTable = ({tasks,setTasks}) => {
  
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
                  onChange={() => toggleCompletion(task.id)} 
                />
              </td>
              <td>
                <button className='editbtn' onClick={onclick}>Edit</button>
                <button className='deletebtn' onClick={onclick}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DisplayTable