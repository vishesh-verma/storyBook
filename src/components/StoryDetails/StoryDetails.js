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
  Box,
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
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Ensures it takes at least full viewport height
        backgroundColor: 'aliceblue',
      }}
    >
      {' '}
      <Box
        sx={{
          maxWidth: '700px',
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '17px',
          textAlign: 'center',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          background: 'white',
        }}
      >
        <Typography
          variant="h2"
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          Task Details
        </Typography>
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
            color="success"
            style={{ marginTop: '20px', width: '160px' }}
          >
            Save
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default StoryDetails
