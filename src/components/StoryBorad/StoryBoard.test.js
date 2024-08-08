// src/_tests_/StoryBoard.test.js

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom' // Use for router context
import StoryBoard from './StoryBoard'

describe('StoryBoard Component', () => {
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

  let deleteTaskMock

  beforeEach(() => {
    deleteTaskMock = jest.fn()
  })

  it('renders tasks correctly', () => {
    render(
      <MemoryRouter>
        <StoryBoard tasks={tasks} deleteTask={deleteTaskMock} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Description 1')).toBeInTheDocument()
    expect(screen.getByText('Deadline: 2024-08-08')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
    expect(screen.getByText('Description 2')).toBeInTheDocument()
    expect(screen.getByText('Deadline: 2024-08-09')).toBeInTheDocument()
  })

  it('calls deleteTask when delete button is clicked', () => {
    render(
      <MemoryRouter>
        <StoryBoard tasks={tasks} deleteTask={deleteTaskMock} />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getAllByText('Delete')[0])
    expect(deleteTaskMock).toHaveBeenCalledWith('1')
  })

  // need to deBug
  //   it('contains view task details button', () => {
  //     render(
  //       <MemoryRouter>
  //         <StoryBoard tasks={tasks} deleteTask={deleteTaskMock} />
  //       </MemoryRouter>,
  //     )

  //     expect(screen.getByTestId('view_button')[0]).toBeInTheDocument()
  //     // console.log(screen.getByText('View Details').closest('a'))

  //     // expect(screen.getByText('View Details')[0]).toHaveAttribute(
  //     //   'href',
  //     //   '/task/2',
  //     // )
  //   })
})
