import ArtworkList from "../components/ArtworkList"
import { useEffect, useState } from 'react';
import { getArtwork } from '../services/apiService';

export default function Artist(props) {

    const [artworks, setArtworks] = useState([])

    useEffect(() => {
        getArtwork().then((data) => {
            // console.log('data:',data)
            setArtworks(data)
        })
    }, []);

    // console.log('here', artworks)
    return (
        <div className='artist-profile-container'>
            <ArtworkList artworks={artworks} favList={props.favList} setFavList={props.setFavList} user={props.user} isAuthenticated={props.isAuthenticated} />
        </div>
    )
}