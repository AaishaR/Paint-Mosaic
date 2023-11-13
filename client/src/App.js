
import './App.css';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import Account from './pages/account';
import Artist from './pages/artist';
import { CartProvider } from './contexts/cartContext';
import auth from './utils/auth';
import { useState } from 'react';


function App() {

  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  return (
    <Router>
      <CartProvider>

        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* <Route path='/cart' element={<Cart />} /> */}
          <Route path='/account' element={<Account setIsAuthenticated={setIsAuthenticated} />}  />
          <Route path='/artist/:artistName' element={<Artist />} />
        </Routes>
      </CartProvider>


    </Router>
  );
}

export default App;