import { useEffect, useState } from "react";
import { getArtist } from "../../services/apiService";
import { useParams } from "react-router-dom";
import Artwork from '../Artwork';

export default function ArtistList(props) {

    const { artistId, artistName } = useParams();
    // const [artistName, setArtistName] = useState('');

    const [artist, setArtist] = useState([]);

    useEffect(() => {
        // console.log('here: ',artistId)
        getArtist(artistId).then((data) => {
            setArtist(data.artwork)
        })


    }, [artistId, artist]);

    return (
        <div className=" min-h-screen flex flex-col items-center justify-center">
            <div className="text-center py-4">
                <h2 className="text-3xl font-bold">{artistName}</h2>
            </div>
            {artist.length ? (
                artist.map((artwork, index) => (
                    <Artwork key={index} artwork={artwork} favList={props.favList} setFavList={props.setFavList} slider={false} />
                ))
            ) : (
                <p>There are no art pieces available yet</p>
            )}
        </div>
    )
}