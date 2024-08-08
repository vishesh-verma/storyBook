// src/_tests_/StoryBoard.test.js

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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
  let sortListMock

  beforeEach(() => {
    deleteTaskMock = jest.fn()
    sortListMock = jest.fn()
  })

  it('renders tasks correctly', () => {
    render(
      <MemoryRouter>
        <StoryBoard
          tasks={tasks}
          deleteTask={deleteTaskMock}
          sortList={sortListMock}
        />
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
        <StoryBoard
          tasks={tasks}
          deleteTask={deleteTaskMock}
          sortList={sortListMock}
        />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getAllByText('Delete')[0])
    expect(deleteTaskMock).toHaveBeenCalledWith('1')
  })

  it('calls toggleSort when Sort button is clicked', async () => {
    render(
      <MemoryRouter>
        <StoryBoard
          tasks={tasks}
          deleteTask={deleteTaskMock}
          sortList={sortListMock}
        />
      </MemoryRouter>,
    )
    const displayedTasks = screen.getAllByTestId('name')
    expect(displayedTasks[0]).toHaveTextContent(tasks[0].name)

    const sort_button = screen.getByTestId('sort_button')
    expect(sort_button).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(sort_button)
    })
    expect(sortListMock).toHaveBeenCalledWith(1)
  })

  // need to deBug
  //   it('contains view task details button', () => {
  //     render(
  //       <MemoryRouter>
  //         <StoryBoard tasks={tasks} deleteTask={deleteTaskMock} />
  //       </MemoryRouter>,
  //     )

  //     expect(screen.getByTestId('view_button')[0]).toBeInTheDocument()

  //     // expect(screen.getByText('View Details')[0]).toHaveAttribute(
  //     //   'href',
  //     //   '/task/2',
  //     // )
  //   })
})
