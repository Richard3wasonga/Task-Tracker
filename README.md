# **Task Traker**

A simple and functional React-based Task Tracker that allows users to add, display, edit, check/uncheck, and delete tasks — all synced with a backend server.

---
## **Installation**

Access the live application here: [Live Link](https:task-tracker-eosin-pi.vercel.app/)

1. Clone this repository:
   ```bash
   git clone https://github.com/Richard3wasonga/Task-Tracker
   ```
2. Navigate to the project directory:
   ```bash
   cd Task-Traker
   ```
3. Ensure the server URL in `index.js` and `admin.js` is set to `https://task-traker-server.vercel.app/tasks`.
4. Run the react app with  writing `npm run dev` on your terminal.

---

## **How the React works**

### **AddForm.jsx**
This script uses data from the input field and storing them in state,then a new object is created and uploaded to the server and update the UI.

```react

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

```
---

### **DisplayTable**

This script gets the todos data passed down as props and displays them on a table.Other features include:

- Delete task
- Edits task(updates title via window prompt)

```react
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
  
  const handleEdit = (id) => {
    const currentTask = tasks.find(task => task.id === id);
    const newTitle = window.prompt("Edit task title:", currentTask.title);

    if (newTitle && newTitle !== currentTask.title) {
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, title: newTitle } : task
      );
      setTasks(updatedTasks);

      fetch(`https://task-traker-server.vercel.app/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title: newTitle,
          completed: currentTask.completed
        }),
      })
        .then(res => res.json())
        .then(data => console.log("Updated:", data))
        .catch(err => console.error("Update failed:", err));
    }
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
                <button className='editbtn' onClick={() => handleEdit(task.id)}>Edit</button>
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

```
---

### **App.jsx**

This script houses whre the main data is fetched and uses the passed down object from add form to add new task to the server

```react

import React,{useState,useEffect} from 'react'
import AddForm from './components/AddForm'
import DisplayTable from './components/DisplayTable'

const App = () => {
  const [Tasks, setTasks] = useState([])
  useEffect(() => {
    fetch('https://task-traker-server.vercel.app/tasks')
    .then(res => res.json())
    .then(data => setTasks(data))
  }, [])
  const handleAddTask = (newTask) => {
    fetch('https://task-traker-server.vercel.app/tasks', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
       },
      body: JSON.stringify(newTask),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Failed to add task");
      }
    })
    .then(savedTask => {
      setTasks(prevTasks => [...prevTasks, savedTask]); 
    })
    .catch(err => {console.error("Error adding task:", err);});
  };
  
  return (
    <div>
      <h1>Task Tracker</h1>
      <AddForm tasks={Tasks} onAddTask={handleAddTask}/>
      <DisplayTable tasks={Tasks} setTasks={setTasks}/>
    </div>
  )
}

export default App

```
---

## **Future Improvements**

- Preventing empty spaces from being added
- Enchance the UI/UX for a mordern look.

## **Authors**
- Richard Wasonga - [GitHub Profile](https://github.com/Richard3wasonga)

## **Contributors**
- Bob Oyier - [GitHub Profile](https://github.com/oyieroyier)

---

## **License**

This project is open-source and available under the MIT License.