import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Container, Typography, Button } from '@mui/material'
import StoryBoard from './components/StoryBorad/StoryBoard'
import AddStory from './components/AddStory/AddStory'
import StoryDetails from './components/StoryDetails/StoryDetails'

const App = () => {
  const [tasks, setTasks] = useState([])
  console.log(localStorage.getItem('tasks'), 'local')

  useEffect(() => {
    const localTask = localStorage.getItem('tasks')
    console.log(localTask, 'localTask')
    if (localTask) {
      const storedTasks = JSON.parse(localTask)
      if (storedTasks) setTasks(storedTasks)
    }
  }, [setTasks])
  console.log(tasks, 'tasks')
  const saveNewTask = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const addTask = (newTask) => {
    setTasks([...tasks, newTask])
    saveNewTask([...tasks, newTask])
  }

  const editTask = (editedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === editedTask.id ? editedTask : task,
    )
    setTasks(updatedTasks)
  }

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
    saveNewTask(updatedTasks)
  }

  return (
    <Router>
      <Container>
        <Typography variant="h3" gutterBottom>
          {tasks.length ? 'StoryBoard' : 'Create New Stories'}
        </Typography>
        <Routes>
          <Route
            path="/"
            element={<StoryBoard tasks={tasks} deleteTask={deleteTask} />}
          />
          <Route
            path="/task/:taskId"
            element={<StoryDetails tasks={tasks} editTask={editTask} />}
          />
          <Route path="/new-task" element={<AddStory addTask={addTask} />} />
        </Routes>
        <Button
          component={Link}
          to="/new-task"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Add Story
        </Button>
      </Container>
    </Router>
  )
}

export default App
