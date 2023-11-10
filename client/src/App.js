
import './App.css';
import Navbar from './components/NavBar';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage'
import Cart from './pages/cart'
import Account from './pages/account'
import Artist from './pages/artist'
import { CartProvider } from './contexts/cartContext';


function App() {

  return (
    <Router>
      <CartProvider>

        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/account' element={<Account />} />
          <Route path='/artist/:artistName' element={<Artist />} />
        </Routes>
      </CartProvider>


    </Router>
  );
}

export default App;