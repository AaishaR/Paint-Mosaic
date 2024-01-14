import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import apiServiceJWT from '../../services/JWTService';
import { RiQuestionLine } from 'react-icons/ri';

export default function ArtworkSliderCard(props) {

    const [artistName, setArtistName] = useState('');
    const [artistUserId, setArtistUserId] = useState('');

    useEffect(() => {
        // console.log(props.artwork.artistId)
        async function fetchData() {
            const artist = await apiServiceJWT.getUserDetails(props.artwork.artistId);
            // console.log(artist)
            setArtistName(artist.name);
            setArtistUserId(artist.userId)
        }

        fetchData();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="artwork-slide max-w-screen-md mx-auto">
            <div className="img-space">
                <img className="artwork-img mx-auto" src={props.artwork.image} alt="artwork" />
            </div>
            <div className="details-container">
                <div className="artist-details">
                    <h1 className="text-2xl font-semibold">{props.artwork.title}</h1>
                    <div className='artist-name'>
                        <p className="text-gray-600">By - <Link to={`/artist/${encodeURIComponent(artistUserId)}/${artistName}`} className="text-indigo-500 hover:underline">{artistName} <RiQuestionLine className='questionmark' /></Link></p>
                    </div>
                </div>
                <div className="artwork-details">
                    
                    <p className='text-lg font-semibold'>Description</p>
                    <p className='title-values'>{props.artwork.description}</p>
                </div>
            </div>
        </div>
    )
}
