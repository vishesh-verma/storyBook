import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

const StoryDetails = ({ tasks, editTask }) => {
  const { taskId } = useParams()
  const [task, setTask] = useState(tasks.find((task) => task.id === taskId))

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
        <FormControl
          fullWidth
          margin="normal"
          style={{ marginTop: '10px', marginBottom: '10px' }}
          label="Status"
        >
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={task.status || ''}
            onChange={handleChange}
            variant="outlined"
            label="Status"
            data-testid="status"
          >
            <MenuItem value="to-do">To Do</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>
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
