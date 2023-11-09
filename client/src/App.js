import { useEffect, useState } from 'react';
import './App.css';
import ArtworkList from './components/ArtworkList';
import Navbar from './components/NavBar';
import { getArtwork } from './apiService';

function App() {

  const [artworks, setArtworks] = useState([])

  useEffect(()=>{
    getArtwork().then((data) => {
      setArtworks(data)
    })
  }, []);

  return (
    <div className="App">
      <div className='Main-container'>
        <Navbar/>
        <ArtworkList artworks={artworks}/>
      </div>
      
    </div>
  );
}

export default App;
