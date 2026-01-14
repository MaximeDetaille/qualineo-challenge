import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Layout } from './components/Layout'
import { ToDoList } from './pages/ToDoList'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="todo" element={<ToDoList />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
