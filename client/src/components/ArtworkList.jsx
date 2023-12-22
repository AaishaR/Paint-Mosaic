import { useEffect, useState } from "react";
import { getArtist } from "../services/apiService";
import { useParams } from "react-router-dom";
import { BiSolidMessageEdit } from "react-icons/bi";
import Artwork from './Artwork';
import Popup from "./MessagePopUp";


export default function ArtistList(props) {

    const { artistName } = useParams();

    const [artist, setArtist] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    useEffect(() => {
        getArtist(artistName).then((data) => {
            // console.log('data:', data)
            setArtist(data.artwork)
        })
    }, [artistName]);
    // console.log('artist: ', artist)

    return (
        <div className="artwork-list-container">
            <div className="list-header">
                <h2>{artistName}</h2>
                {props.isAuthenticated &&
                    <button className="msg-btn" onClick={openPopup}><BiSolidMessageEdit className="message-icon" /></button>
                }
                {popupOpen && <Popup onClose={closePopup} user={props.user} recevierName={artistName}/>}

            </div>
            {artist.length ? artist.map((artwork, index) => (
                <Artwork key={index} artwork={artwork} favList={props.favList} setFavList={props.setFavList} user={props.user} slider={false} isAuthenticated={props.isAuthenticated} />

            )) :
                <p>There are no art pieces available yet</p>}
        </div>
    )
}