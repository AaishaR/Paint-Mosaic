import ArtworkList from "../components/ArtworkList"
import { useEffect, useState } from 'react';
import { getArtwork } from '../apiService';

export default function Artist() {

    const [artworks, setArtworks] = useState([])

    useEffect(() => {
        getArtwork().then((data) => {
            setArtworks(data)
        })
    }, []);
    return (
        <div className='artist-profile-container'>
            <ArtworkList artworks={artworks} />
        </div>
    )
}