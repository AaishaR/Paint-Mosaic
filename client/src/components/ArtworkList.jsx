import { useEffect, useState } from "react";
import { getArtist } from "../apiService";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/cartContext";
import { RiShoppingBag3Fill } from 'react-icons/ri'
import { BiDollarCircle } from 'react-icons/bi';

export default function ArtistList() {

    const { addToCart } = useCart();

    const handleClick = (item) => {

        // console.log('Handling click for item:', item);
        addToCart(item);
    }

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
                <div key={index} className="artwork-list-element">

                    <div className="details-container-el">
                        <div className="art-detials">
                            <h3>{artwork.title}</h3>
                            <p className='title'>Desctiption </p>
                            <p>{artwork.description}</p>
                        </div>

                        <div className="el">


                            <div className="artist-details">
                                <div className="sub-artist-details">
                                    <div className='category'>
                                        <p className='title'>Category</p>
                                        <p className='title-values'>{artwork.category}</p>
                                    </div>
                                    <div className='material'>
                                        <p className='title'>Material</p>
                                        <p className='title-values'>{artwork.material}</p>
                                    </div>
                                    <div className='size'>
                                        <p className='title'>Size</p>
                                        <p className='title-values'>{artwork.dimensions}</p>
                                    </div>
                                </div>

                            </div>
                            <div className="pricing-container">
                                <p>{artwork.price}</p>
                                <button onClick={() => { handleClick(artwork) }}><RiShoppingBag3Fill className="addTobag" /></button>
                                <button><BiDollarCircle className="bid" /></button>
                            </div>
                        </div>

                    </div>
                    <div className="img-icon-space">
                        <img className="artwork-img" src={artwork.image} alt="artwork" />
                    </div>
                </div>
            )) :
                <p>There are no art pieces available yet</p>}
        </div>
    )
}