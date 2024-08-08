import React, { useState } from 'react'
import { Grid, Typography, Button, Container, Card } from '@mui/material'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import PageviewIcon from '@mui/icons-material/Pageview'
const StoryBoard = ({ tasks, deleteTask, sortList }) => {
  const [sortToggle, setSortToggle] = useState(1)
  const toggleSort = (value) => {
    setSortToggle(-value)
    sortList(sortToggle)
  }
  const handleDelete = (taskId) => {
    deleteTask(taskId)
  }

  return (
    <Container>
      {tasks.length ? (
        <Button
          component={Button}
          variant="contained"
          color="primary"
          style={{ marginBottom: '20px' }}
          onClick={() => toggleSort(sortToggle)}
          data-testid="sort_button"
        >
          {sortToggle === 1 ? 'Sort A - Z' : 'Sort Z - A'}
        </Button>
      ) : null}

      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item key={task.id} xs={12} md={4}>
            <Card
              sx={{
                margin: '10px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                },
                borderRadius: '10px',
                border: '1px solid #ddd',
                padding: '12px',
              }}
            >
              <Typography
                data-testid="name"
                variant="h6"
                sx={{ textAlign: 'center' }}
              >
                {task.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ textAlign: 'center', paddingTop: '5px' }}
              >
                {task.description}
              </Typography>

              <Typography
                variant="body2"
                sx={{ textAlign: 'center', paddingTop: '5px' }}
              >
                <span style={{ color: 'red' }}>Deadline:</span>{' '}
                <strong>{task.deadline}</strong>
              </Typography>

              <Typography
                variant="body2"
                sx={{ textAlign: 'center', paddingTop: '5px' }}
              >
                Status: {task.status}
              </Typography>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: '1rem',
                }}
              >
                <Button
                  onClick={() => handleDelete(task.id)}
                  variant="outlined"
                  style={{ marginTop: '10px' }}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                <Button
                  component={Link}
                  to={`/task/${task.id}`}
                  variant="outlined"
                  data-testid="view_button"
                  style={{ marginTop: '10px', marginLeft: '10px' }}
                  startIcon={<PageviewIcon />}
                >
                  View Details
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default StoryBoard
