import { useCart } from '../contexts/cartContext';
import { useState, useEffect } from 'react';
import { RiShoppingBag3Fill, RiQuestionLine } from 'react-icons/ri';
import { TiBookmark } from 'react-icons/ti';
import apiServiceJWT from '../services/JWTService';
import { Link } from 'react-router-dom';

export default function Artwork(props) {

    const [isArtworkFavorited, setIsArtworkFavorited] = useState(false)
    const { addToCart } = useCart();

    const handleClick = (item) => {
        addToCart(item);
    }

    const handleClickToFav = (item) => {
        const isFavorited = props.favList.filter(el => el._id === item._id);

        if (isFavorited.length) {

            props.setFavList((prev) => prev.filter((el) => el._id !== item._id));
            apiServiceJWT.removeFav(props.user._id, item._id);

        } else {

            props.setFavList((prev) => [...prev, item]);
            // console.log(props.user._id)
            apiServiceJWT.addFav(props.user._id, item);
        }

        // favouriteToggle(item);
    };

    useEffect(()=>{
        let newArr = props.favList.filter(el => el._id === props.artwork._id);
        setIsArtworkFavorited(newArr.length) 

    }, [props.favList])

    return (

        <div className="artwork-slide">
            <div className="img-space">
                <img className="artwork-img" src={props.artwork.image} alt="artwork" />
            </div>
            <div className="details-container">
                <div className="artist-details">
                    <h1>{props.artwork.title}</h1>
                    <p>By - <Link to={`/artist/${encodeURIComponent(props.artwork.artist.name)}`}>{props.artwork.artist.name} <RiQuestionLine className='questionmark' /></Link></p>
                    <div className="sub-artist-details">
                        <div className='category'>
                            <p className='title'>Category</p>
                            <p className='title-values'>{props.artwork.category}</p>
                        </div>
                        <div className='material'>
                            <p className='title'>Material</p>
                            <p className='title-values'>{props.artwork.material}</p>
                        </div>
                        <div className='size'>
                            <p className='title'>Size</p>
                            <p className='title-values'>{props.artwork.dimensions}</p>
                        </div>
                    </div>

                </div>

                <div className="artwork-detials">
                    <div className="pricing-container">
                        <p>{props.artwork.price}</p>
                        <button onClick={() => { handleClick(props.artwork) }}><RiShoppingBag3Fill className="addTobag" /></button>
                        <button onClick={() => { handleClickToFav(props.artwork) }} style={{ color: (isArtworkFavorited) ? 'red' : 'black' }}><TiBookmark className="bookmark" /></button>
                    </div>
                    <p className='title'>Description</p>
                    <p className='title-values'>{props.artwork.description}</p>
                </div>
            </div>
        </div>

    )
}