import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/data-science" replace />} />
        <Route path="/data-science" element={<LandingPage courseKey="data-science" />} />
        <Route path="/devops" element={<LandingPage courseKey="devops" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
