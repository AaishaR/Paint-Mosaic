import { useEffect, useState } from "react";
import { getArtist } from "../services/apiService";
import { useParams } from "react-router-dom";
import Artwork from './Artwork';


export default function ArtistList(props) {

    const { artistName } = useParams();

    const [artist, setArtist] = useState([])

    useEffect(() => {
        getArtist(artistName).then((data) => {
            setArtist(data)
        })
    }, [artistName]);

    return (
        <div className="artwork-list-container">
            <h2>{artistName}</h2>
            {artist.length ? artist.map((artwork, index) => (
                <Artwork key={index} artwork={artwork} favList={props.favList} setFavList={props.setFavList} user={props.user} slider={false} />

            )) :
                <p>There are no art pieces available yet</p>}
        </div>
    )
}