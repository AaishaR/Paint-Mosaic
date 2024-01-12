import ArtworkSlider from "./ArtworkSlider"
import { useEffect, useState } from 'react';
import { getArtwork } from '../../services/apiService';

export default function HomePage(props) {

    const [artworks, setArtworks] = useState([])

    useEffect(() => {
        getArtwork().then((data) => {
            setArtworks(data)
        })
    }, []);

    return (
        <>
            {artworks.length ? <div className="mx-4 my-8">
                {/* <ArtworkSlider artworks={artworks} favList={props.favList} setFavList={props.setFavList} user={props.user} isAuthenticated={props.isAuthenticated} /> */}
                <ArtworkSlider artworks={artworks} />
            </div> : <div className="mx-4 my-8"> <p> No Artwork Available</p></div>
            }
        </>

    )
}