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

```jsx

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
- Edits task (Updates title via window prompt)

```jsx
import React from 'react';


const DisplayTable = ({ tasks, setTasks }) => {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://task-traker-server.vercel.app/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the task on the server');
      }

      const removedTasks = tasks.filter(task => task.id !== id);
      setTasks(removedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleChecked = (id) => {
    const doneTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(doneTasks);

    const updatedDoneTask = doneTasks.find(task => task.id === id);

    fetch(`https://task-traker-server.vercel.app/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: updatedDoneTask.id,
        title: updatedDoneTask.title,
        completed: updatedDoneTask.completed,
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
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
          completed: currentTask.completed,
        }),
      })
        .then(res => res.json())
        .then(data => console.log("Updated:", data))
        .catch(err => console.error("Update failed:", err));
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Task List</h2>
      <table className="task-table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header">Task</th>
            <th className="table-header">Completed</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className={`table-row ${task.completed ? 'completed-task' : ''}`}>
              <td className="table-data task-title">{task.title}</td>
              <td className="table-data">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.completed}
                  onChange={() => handleChecked(task.id)}
                />
              </td>
              <td className="table-data task-actions">
                <button className="edit-btn" onClick={() => handleEdit(task.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;

```
---

### **App.jsx**

This script houses whre the main data is fetched and uses the passed down object from add form to add new task to the server

```jsx

import React, { useState } from 'react';


const AddForm = ({ tasks, onAddTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return; 

    const lastId = tasks.length > 0 ? parseInt(tasks[tasks.length - 1].id) : 0;
    const newId = (lastId + 1).toString();

    const newTaskObj = {
      id: newId,
      title: newTask,
      completed: false,
    };

    onAddTask(newTaskObj);
    setNewTask('');
  };

  const handleNewTask = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <div className="add-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          className="add-input"
          placeholder="Add a new task..."
          value={newTask}
          onChange={handleNewTask}
          required
        />
        <button className="add-btn" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddForm;

```
---

## **Features overview**

- Adding tasks
- Editing tasks
- Deleting tasks

## **Future Improvements**

- Preventing empty spaces from being added
- Enchance the UI/UX for a mordern look.
- Automatic update without need for page refresh.

## **Authors**
- Richard Wasonga - [GitHub Profile](https://github.com/Richard3wasonga)

## **Contributors**
- Bob Oyier - [GitHub Profile](https://github.com/oyieroyier)

---

## **License**

This project is open-source and available under the MIT License.