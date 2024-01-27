import ArtworkList from "./ArtworkList"
import { useEffect, useState } from 'react';
import { getArtwork } from '../../services/apiService';
// import SendMail from "./SendMail";

export default function Artist(props) {

    const [artworks, setArtworks] = useState([])

    useEffect(() => {
        getArtwork().then((data) => {
            setArtworks(data)
        })
    }, []);

    return (
        <div className='artist-profile-container'>
            {/* <ArtworkList artworks={artworks} favList={props.favList} setFavList={props.setFavList} user={props.user} isAuthenticated={props.isAuthenticated} /> */}
            <ArtworkList artworks={artworks}/>
            {/* <SendMail/> */}
        </div>
    )
}
