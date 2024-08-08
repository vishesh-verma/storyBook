import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

// Mock localStorage
const mockLocalStorage = (function () {
  let store = {}
  return {
    getItem(key) {
      return store[key] || null
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    removeItem(key) {
      delete store[key]
    },
    clear() {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})
describe('App Component', () => {
  beforeEach(() => {
    mockLocalStorage.clear()
  })

  it('renders App component properly', () => {
    render(<App />)

    // Check if "Create New Stories" text is present initially
    expect(screen.getByText(/Create New Stories/i)).toBeInTheDocument()
  })

  it('displays StoryBoard when tasks are present', () => {
    mockLocalStorage.setItem(
      'tasks',
      JSON.stringify([
        {
          id: 1,
          name: 'Task 1',
          description: 'Description',
          deadline: '2024-12-31',
        },
      ]),
    )

    render(<App />)

    const storyBoard = screen.getByText(/StoryBoard/i)
    expect(storyBoard).toBeInTheDocument()
  })

  it('navigates to Add Story page when "Add Story" button is clicked', () => {
    render(<App />)

    // Click on the "Add Story" button
    fireEvent.click(screen.getByText(/Add Story/i))

    // Check if the path changes to "/new-task"
    expect(window.location.pathname).toBe('/new-task')
  })
})
