import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import ContactPage from './pages/contactUs'
import RoomsServicesPage from './pages/RoomsServices'
import BookingPage from './pages/Booking'
import ScrollToTop from './components/ScrollToTop'

function App() {

  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
         <Routes>
          <Route path='/' element={<Homepage/>}></Route>
           <Route path='/home' element={<Homepage/>}></Route>
           <Route path='/rooms' element={<RoomsServicesPage/>}></Route>
           <Route path='/contact' element={<ContactPage/>}></Route>
           <Route path='/booking' element={<BookingPage/>}></Route>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
