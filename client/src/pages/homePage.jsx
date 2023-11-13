import ArtworkSlider from "../components/ArtworkSlider"
import { useEffect, useState } from 'react';
import { getArtwork } from '../services/apiService';

export default function HomePage() {

    const [artworks, setArtworks] = useState([])

    useEffect(() => {
        getArtwork().then((data) => {
            setArtworks(data)
        })
    }, []);

    return (

        <div className='Main-container'>
            <ArtworkSlider artworks={artworks} />
        </div>

    )
}