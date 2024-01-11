import { useEffect, useState } from "react";
import { getArtist } from "../services/apiService";
import { useParams } from "react-router-dom";
import Artwork from './Artwork';

export default function ArtistList(props) {

    const { artistId, artistName } = useParams();
    // const [artistName, setArtistName] = useState('');

    const [artist, setArtist] = useState([]);

    useEffect(() => {
        console.log('here: ',artistId)
        getArtist(artistId).then((data) => {
            setArtist(data.artwork)
        })

        console.log(artist)

    }, [artistId]);

    return (
        <div className="artwork-list-container">
            <div className="list-header">
                <h2>{artistName}</h2>
            </div>
            {artist.length ? artist.map((artwork, index) => (
                <Artwork key={index} artwork={artwork} favList={props.favList} setFavList={props.setFavList} slider={false} />

            )) :
                <p>There are no art pieces available yet</p>}
        </div>
    )
}