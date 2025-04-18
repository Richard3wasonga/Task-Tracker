import React,{useState,useEffect} from 'react'
import AddForm from './components/AddForm'
import DisplayTable from './components/DisplayTable'

const App = () => {
  const [Tasks, setTasks] = useState([])
  useEffect(() => {
    fetch('https://task-traker-server.vercel.app/tasks')
    .then(res => res.json())
    .then(data => setTasks(data))
  }, [Tasks])
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
      <AddForm tasks={Tasks} setTasks={setTasks} onAddTask={handleAddTask}/>
      <DisplayTable tasks={Tasks} setTasks={setTasks}/>
    </div>
  )
}

export default App