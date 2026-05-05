import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Preview from './pages/Preview'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  )
}
