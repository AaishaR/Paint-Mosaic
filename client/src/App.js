
import './App.css';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import Account from './pages/account';
import Artist from './pages/artist';
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
      console.log('token: ', token);
      if(token){
        const user = await apiServiceJWT.getUser(token);
        // console.log('user', user)
        if(user) {

          console.log('we hereee')
          setIsAuthenticated(true);
          setUserinfo(user);
          const list =  user.favoriteArtworks;
          setFavList(list);
        }
      }
    })();
  }, [token])
  
  // console.log('userinfo before return', userInfo);

  return (
    <Router>
        <FavProvider>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<HomePage setFavList={setFavList} favList={favList} user={userInfo} isAuthenticated={isAuthenticated} />} />
            <Route path='/account' element={<Account setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} user={userInfo} />} />
            <Route path='/artist/:artistName' element={<Artist setFavList={setFavList} favList={favList} user={userInfo} isAuthenticated={isAuthenticated}/>} />
          </Routes>
        </FavProvider>


    </Router>
  );
}

export default App;