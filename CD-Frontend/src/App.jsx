import './App.css'
import { Route,Routes } from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Login from './pages/login/login'
import Snippets from './pages/snippets/snippets'
import Add from './pages/add/AddSnippet'
import EditSnippet from './pages/edit/editSnippet'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="login" element={<Login />} /> 
        <Route path="snippets" element={<Snippets />} /> 
        <Route path="addsnippet" element={<Add />} />
        <Route path="editsnippet" element={<EditSnippet />} />
      </Routes>
  )
}

export default App
