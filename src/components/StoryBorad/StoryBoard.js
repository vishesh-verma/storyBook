import React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const StoryBoard = ({ tasks, deleteTask }) => {
  const handleDelete = (taskId) => {
    deleteTask(taskId)
  }

  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid item key={task.id} xs={12} md={4}>
          <div
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          >
            <Typography variant="h6">{task.name}</Typography>
            <Typography variant="body2">{task.description}</Typography>
            <Typography variant="body2">Status: {task.status}</Typography>

            <Typography variant="caption">Deadline: {task.deadline}</Typography>

            <Button
              onClick={() => handleDelete(task.id)}
              variant="outlined"
              style={{ marginTop: '10px' }}
            >
              Delete
            </Button>
            <Button
              component={Link}
              to={`/task/${task.id}`}
              variant="outlined"
              data-testid="view_button"
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              View Details
            </Button>
          </div>
        </Grid>
      ))}
    </Grid>
  )
}

export default StoryBoard
