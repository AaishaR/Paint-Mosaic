
import './App.css';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import Account from './pages/account';
import Artist from './pages/artist';
import { CartProvider } from './contexts/cartContext';
import { FavProvider } from './contexts/favouriteContext';
import auth from './utils/auth';
import { useEffect, useState } from 'react';
import apiServiceJWT from './services/JWTService' 


function App() {

  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);
  const [userInfo, setUserinfo] = useState();
  const [favList, setFavList] = useState([]);

  const token = localStorage.getItem('accessToken');

  useEffect(()=>{
    (async () => {
      if(token){
        const user = await apiServiceJWT.getUser(token);
        setIsAuthenticated(true);
        setUserinfo({...user});
        // console.log('user: ', user);
        // console.log('userinfo', userInfo);
        const list = user.favoriteArtworks;
        setFavList(list);
      }
    })();
  }, [token, setIsAuthenticated, setUserinfo, setFavList])
  
  console.log('userinfo before return', userInfo);

  return (
    <Router>
      <CartProvider>
        <FavProvider>

          <Navbar />
          <Routes>
            <Route path='/' element={userInfo && <HomePage setFavList={setFavList} favList={favList} user={userInfo} />} />
            {/* <Route path='/cart' element={<Cart />} /> */}
            <Route path='/account' element={<Account setIsAuthenticated={setIsAuthenticated} />} />
            <Route path='/artist/:artistName' element={<Artist />} />
          </Routes>
        </FavProvider>
      </CartProvider>


    </Router>
  );
}

export default App;