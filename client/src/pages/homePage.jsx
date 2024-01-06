import ArtworkSlider from "../components/ArtworkSlider"
import { useEffect, useState } from 'react';
import { getArtwork } from '../services/apiService';

export default function HomePage(props) {

    const [artworks, setArtworks] = useState([])

    useEffect(() => {
        getArtwork().then((data) => {
            setArtworks(data)
        })
    }, []);

    return (
        <>
            {artworks.length ? <div className='Main-container'>
                <ArtworkSlider artworks={artworks} favList={props.favList} setFavList={props.setFavList} user={props.user} isAuthenticated={props.isAuthenticated} />
            </div> : <div> <p> No Artwork Available</p></div>
            }
        </>

    )
}