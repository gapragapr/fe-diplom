import './App.css'
import LandingPage from './Components/LandingPage/LandingPage';
import ErrorPopUp from './Components/ErrorPopUp/ErrorPopUp';
import TicketPage from './Components/TicketPage/TicketPage';
import PassengersPage from './Components/PassengersPage/PassengersPage';
import PaymentPage from './Components/PaymentPage/PaymentPage';
import AcceptPage from './Components/AcceptPage/AcceptPage';
import TyPage from './Components/TyPage/TyPage';
import { Routes, Route } from 'react-router';

function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/roads/*' element={<TicketPage />} />
      <Route path='/passengers' element={<PassengersPage />} />
      <Route path='/payment' element={<PaymentPage />} />
      <Route path='/accept' element={<AcceptPage />} />
      <Route path={'/ty'} element={<TyPage />}/>
    </Routes>
  );
}

export default App;
