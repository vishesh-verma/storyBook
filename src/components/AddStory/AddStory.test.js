// src/_tests_/AddStory.test.js

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddStory from './AddStory'

// Mock uuid to control its output
jest.mock('uuid', () => ({
  v4: jest.fn(() => '12345'),
}))

describe('AddStory Component', () => {
  let addTaskMock

  beforeEach(() => {
    addTaskMock = jest.fn()
  })

  it('renders AddStory component correctly', () => {
    render(<AddStory addTask={addTaskMock} />)

    expect(screen.getByText(/Add New Task/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Deadline/i)).toBeInTheDocument()
  })

  it('updates input fields correctly', () => {
    render(<AddStory addTask={addTaskMock} />)
    // Change label for Name
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Test Task' },
    })

    // Change label for Description
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Test Description' },
    })

    // Change label for Deadline
    fireEvent.change(screen.getByLabelText(/Deadline/i), {
      target: { value: '2024-12-31' },
    })

    expect(screen.getByLabelText(/Name/i).value).toBe('Test Task')
    expect(screen.getByLabelText(/Description/i).value).toBe('Test Description')
    expect(screen.getByLabelText(/Deadline/i).value).toBe('2024-12-31')
  })

  it('calls addTask with correct values on form submit', () => {
    render(<AddStory addTask={addTaskMock} />)

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Test Task' },
    })
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Test Description' },
    })
    fireEvent.change(screen.getByLabelText(/Deadline/i), {
      target: { value: '2024-12-31' },
    })

    // Submitting the Task with all the values.
    fireEvent.click(screen.getByText(/Add Task/i))
    expect(addTaskMock).toHaveBeenCalledWith({
      name: 'Test Task',
      description: 'Test Description',
      deadline: '2024-12-31',
    })
  })

  it('resets form fields after submission', () => {
    render(<AddStory addTask={addTaskMock} />)

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Test Task' },
    })
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Test Description' },
    })
    fireEvent.change(screen.getByLabelText(/Deadline/i), {
      target: { value: '2024-12-31' },
    })

    fireEvent.click(screen.getByText(/Add Task/i))

    expect(screen.getByLabelText(/Name/i).value).toBe('')
    expect(screen.getByLabelText(/Description/i).value).toBe('')
    expect(screen.getByLabelText(/Deadline/i).value).toBe('')
  })
})
