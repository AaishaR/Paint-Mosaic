
import './App.css';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import Account from './components/Account/Account';
import Artist from './components/Artist/Artist';
import AddWork from './components/AddWork/AddWork';
import { FavProvider } from './contexts/favouriteContext';
// import auth from './utils/auth';
// import { useEffect, useState } from 'react';
// import apiServiceJWT from './services/JWTService';
import { AuthProvider } from './contexts/auth';


function App() {
  // const [favList, setFavList] = useState([]);

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
  // }, [])

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