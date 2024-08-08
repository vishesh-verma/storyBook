import React, { useState } from 'react'
import { Container, Typography, Button, TextField } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

const AddStory = ({ addTask }) => {
  const [newTask, setNewTask] = useState({
    id: uuidv4(),
    name: '',
    description: '',
    deadline: '',
  })

  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addTask(newTask)
    setNewTask({
      id: uuidv4(),
      name: '',
      description: '',
      deadline: '',
    })
  }

  return (
    <Container>
      <Typography variant="h4">Add New Task</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={newTask.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          style={{ marginTop: '10px' }}
        />
        <TextField
          name="description"
          label="Description"
          value={newTask.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          style={{ marginTop: '10px' }}
        />
        <TextField
          name="deadline"
          label="Deadline"
          type="date"
          value={newTask.deadline}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          style={{ marginTop: '10px' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Add Task
        </Button>
      </form>
    </Container>
  )
}

export default AddStory
