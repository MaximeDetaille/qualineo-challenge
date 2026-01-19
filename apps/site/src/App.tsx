import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Layout } from './components/Layout'
import { ToDoList } from './pages/ToDoList'
import { Toaster } from 'sonner'

const App: React.FC = () => {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="todo" element={<ToDoList />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
