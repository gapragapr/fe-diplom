import './App.css'
import LandingPage from './Components/LandingPage/LandingPage';
import ErrorPopUp from './Components/ErrorPopUp/ErrorPopUp';
import TicketPage from './Components/TicketPage/TicketPage';
import { Routes, Route } from 'react-router';

function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/roads' element={<TicketPage />}/>
    </Routes>
  );
}

export default App;
