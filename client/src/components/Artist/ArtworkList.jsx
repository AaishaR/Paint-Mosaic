import { useEffect, useState } from "react";
import { getArtist } from "../../services/apiService";
import { useParams } from "react-router-dom";
import Artwork from '../Artwork';
import SendMail from "./SendMail";

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

    // console.log(artist)
    return (
        <div className=" min-h-screen flex flex-col items-center justify-center">
            <div className="text-center py-4">
                <h2 className="text-3xl font-bold">{artistName}</h2>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg px-4 lg:px-8">
                    Testing out something here for later use. Trying to see how much more text I can add to this to check the responsiveness.
                </p>
            </div>
            {artist.length ? (
                artist.map((artwork, index) => (
                    <Artwork key={index} artwork={artwork} favList={props.favList} setFavList={props.setFavList} slider={false} />
                ))
            ) : (
                <p>There are no art pieces available yet</p>
            )}
            <div>
                <SendMail artistId={artistId}/>
            </div>
        </div>
    )
}