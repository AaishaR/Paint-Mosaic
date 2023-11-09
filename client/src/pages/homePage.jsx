import ArtworkList from "../components/ArtworkList"
import { useEffect, useState } from 'react';
import { getArtwork } from '../apiService';

export default function HomePage() {

    const [artworks, setArtworks] = useState([])

    useEffect(() => {
        getArtwork().then((data) => {
            setArtworks(data)
        })
    }, []);
    return (
        <div className="main-container">
            <div className='Main-container'>
                <ArtworkList artworks={artworks} />
            </div>
        </div>
    )
}