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
        <div className="artwork-slide max-w-screen-md mx-auto p-4">

            <div className="mb-4">
                <img
                    src={props.artwork.image}
                    alt="Preview"
                    className="rounded-lg border border-gray-900/25 object-cover w-full"
                />
            </div>

            <div className="details-container">
                <div className="artist-details">
                    <h1 className="text-2xl font-semibold mb-2">{props.artwork.title}</h1>
                    <div className="flex items-center">
                        <p className="text-gray-600 mr-1">By - <Link to={`/artist/${encodeURIComponent(artistUserId)}/${artistName}`} className="text-indigo-500 hover:underline">{artistName}</Link></p>
                        <RiQuestionLine className='questionmark' />
                    </div>
                </div>

                <div className="artwork-details mt-4">
                    <p className='text-lg font-semibold mb-2'>Description</p>
                    <p className='text-gray-700'>{props.artwork.description}</p>
                </div>
            </div>

        </div>
    )
}
