
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Search from './pages/Search'
import ReportLost from './pages/ReportLost'
import ReportFound from './pages/ReportFound'
import ItemDetails from './pages/ItemDetails'
import Claims from './pages/Claims'
import Account from './pages/Account'

function App() {
  console.log("API URL:", import.meta.env.VITE_API_URL)

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/search" element={<Search />} />

        <Route path="/report-lost" element={<ReportLost />} />

        <Route path="/report-found" element={<ReportFound />} />

        <Route path="/items/:id" element={<ItemDetails />} />

        <Route path="/claims" element={<Claims />} />

        <Route path="/account" element={<Account />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App