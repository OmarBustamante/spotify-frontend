import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Callback from './pages/Callback'
import Dashboard from './pages/Dashboard'
import ArtistPage from './pages/ArtistPage'
import AlbumPage from './pages/AlbumPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/callback' element={<Callback />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/artists/:id' element={<ArtistPage />} />
        <Route path='/albums/:id' element={<AlbumPage />} />
      </Routes>
    </Router>
  )
}

export default App
