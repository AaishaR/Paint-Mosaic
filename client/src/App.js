
import './App.css';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import Account from './pages/account';
import Artist from './pages/artist';
import AddWork from './pages/addWork';
import { FavProvider } from './contexts/favouriteContext';
// import auth from './utils/auth';
// import { useEffect, useState } from 'react';
// import apiServiceJWT from './services/JWTService';
import { AuthProvider } from './contexts/auth';


function App() {

  // const initialState = auth.isAuthenticated();
  // const [isAuthenticated, setIsAuthenticated] = useState(initialState);
  // const [userInfo, setUserinfo] = useState();
  // const [favList, setFavList] = useState([]);

  // const token = localStorage.getItem('accessToken');

  // useEffect(() => {
  //   (async () => {
  //     console.log('token: ', token);
  //     if (token) {
  //       const user = await apiServiceJWT.getUser(token);
  //       // console.log('user', user)
  //       if (user) {

  //         console.log('we hereee')
  //         setIsAuthenticated(true);
  //         setUserinfo(user);
  //         const list = user.favoriteArtworks;
  //         setFavList(list);
  //       }
  //     }
  //   })();
  // }, [token])

  // console.log('userinfo before return', userInfo);

  return (
    <Router>
      <AuthProvider>
        <FavProvider>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<HomePage/>} />
            <Route path='/account' element={<Account/>} />
            <Route path='/artist/:artistId/:artistName' element={<Artist/>} />
            <Route path='/addWork' element={<AddWork/>} />
          </Routes>
        </FavProvider>
      </AuthProvider>


    </Router>
  );
}

export default App;