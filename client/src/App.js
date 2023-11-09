import './App.css';
import ArtworkList from './components/ArtworkList';
import Navbar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <div className='Main-container'>
        <Navbar/>
        <ArtworkList/>
      </div>
      
    </div>
  );
}

export default App;
