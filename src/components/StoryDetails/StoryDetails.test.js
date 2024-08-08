// src/_tests_/StoryDetails.test.js

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import StoryDetails from './StoryDetails'

describe('StoryDetails Component', () => {
  const tasks = [
    {
      id: '1',
      name: 'Task 1',
      description: 'Description 1',
      deadline: '2024-08-08',
    },
    {
      id: '2',
      name: 'Task 2',
      description: 'Description 2',
      deadline: '2024-08-09',
    },
  ]

  let editTaskMock

  beforeEach(() => {
    editTaskMock = jest.fn()
  })

  it('renders the task details based on URL parameter', () => {
    render(
      <MemoryRouter initialEntries={['/task/1']}>
        <Routes>
          <Route
            path="/task/:taskId"
            element={<StoryDetails tasks={tasks} editTask={editTaskMock} />}
          />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByLabelText('Name')).toHaveValue('Task 1')
    expect(screen.getByLabelText('Description')).toHaveValue('Description 1')
    expect(screen.getByLabelText('Deadline')).toHaveValue('2024-08-08')
  })

  it('handles input changes correctly', () => {
    render(
      <MemoryRouter initialEntries={['/task/1']}>
        <Routes>
          <Route
            path="/task/:taskId"
            element={<StoryDetails tasks={tasks} editTask={editTaskMock} />}
          />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Updated Task' },
    })
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Updated Description' },
    })
    fireEvent.change(screen.getByLabelText('Deadline'), {
      target: { value: '2024-08-10' },
    })

    expect(screen.getByLabelText('Name')).toHaveValue('Updated Task')
    expect(screen.getByLabelText('Description')).toHaveValue(
      'Updated Description',
    )
    expect(screen.getByLabelText('Deadline')).toHaveValue('2024-08-10')
  })

  it('calls editTask with updated task data on form submission', () => {
    render(
      <MemoryRouter initialEntries={['/task/1']}>
        <Routes>
          <Route
            path="/task/:taskId"
            element={<StoryDetails tasks={tasks} editTask={editTaskMock} />}
          />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Updated Task' },
    })
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Updated Description' },
    })
    fireEvent.change(screen.getByLabelText('Deadline'), {
      target: { value: '2024-08-10' },
    })
    fireEvent.click(screen.getByText('Save'))

    expect(editTaskMock).toHaveBeenCalledWith({
      id: '1',
      name: 'Updated Task',
      description: 'Updated Description',
      deadline: '2024-08-10',
    })
  })
})
