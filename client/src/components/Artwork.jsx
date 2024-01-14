import { useState, useEffect } from 'react';
import { RiQuestionLine, RiFileInfoLine } from 'react-icons/ri';
import { TiBookmark } from 'react-icons/ti';

import { useAuth } from '../contexts/auth';
import ArtworkSliderCard from './Home/ArtworkSliderCard';

export default function Artwork(props) {

    const { isAuthenticated } = useAuth();
    const [isArtworkFavorited, setIsArtworkFavorited] = useState(false);

    
    

    const handleClickToFav = (item) => {
        // const isFavorited = props.favList.filter(el => el._id === item._id);

        // if (isFavorited.length) {

        //     props.setFavList((prev) => prev.filter((el) => el._id !== item._id));
        //     apiServiceJWT.removeFav(props.user._id, item._id);

        // } else {

        //     props.setFavList((prev) => [...prev, item]);
        //     apiServiceJWT.addFav(props.user._id, item);
        // }

    };

    

    // useEffect(() => {
    //     let newArr = props.favList.filter(el => el._id === props.artwork._id); 
    //     setIsArtworkFavorited(newArr.length) 

    //     // eslint-disable-next-line
    // }, [props.favList]) 

    return (
        <>
            {props.slider ?

                <ArtworkSliderCard artwork={props.artwork}/>
                :
                <div className="artwork-list-element">

                    <div className='art-title'>
                        <h3>{props.artwork.title}</h3>
                    </div>

                    <div className='list-container'>
                        <div className="details-container-el">
                            <div className="img-icon-space">
                                <img className="artwork-img" src={props.artwork.image} alt="artwork" />
                            </div>

                            <div className="el">

                                <div className="sub-artist-details-el">
                                    <div className='category'>
                                        <p className='title'><RiFileInfoLine /></p>
                                        <p className='title-values'>Category: {props.artwork.category}</p>
                                        <p className='title-values'>Material: {props.artwork.material}</p>
                                        <p className='title-values'>Size: {props.artwork.dimensions}</p>
                                    </div>
                                </div>


                                <div className='pricing-space'>

                                    <div className="pricing-container">
                                        <p>{props.artwork.price}</p>
                                        {/* <button onClick={() => { handleClick(props.artwork) }}><RiShoppingBag3Fill className="addTobag" /></button> */}
                                        {isAuthenticated &&
                                            <button onClick={() => { handleClickToFav(props.artwork) }} style={{ color: (isArtworkFavorited) ? 'red' : 'black' }}><TiBookmark className="bookmark" /></button>
                                        }

                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="art-detials">
                            {/* <p className='title'>Desctiption:</p> */}
                            <p>{props.artwork.description}</p>
                        </div>

                    </div>
                </div>}
        </>


    )
}