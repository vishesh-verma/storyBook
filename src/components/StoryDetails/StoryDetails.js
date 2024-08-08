import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Typography, Button, TextField } from '@mui/material'

const StoryDetails = ({ tasks, editTask }) => {
  const { taskId } = useParams()
  console.log(taskId)
  const [task, setTask] = useState(tasks.find((task) => task.id === taskId))

  console.log(task)

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editTask(task)
  }

  return (
    <Container>
      <Typography variant="h4">Task Details</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={task.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          style={{ marginTop: '10px' }}
        />
        <TextField
          name="description"
          label="Description"
          value={task.description}
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
          value={task.deadline}
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
          Save
        </Button>
      </form>
    </Container>
  )
}

export default StoryDetails
