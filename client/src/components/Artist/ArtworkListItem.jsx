// import React, { useState } from 'react'
// import { TiBookmark } from 'react-icons/ti';
// import { useAuth } from '../../contexts/auth';

export default function ArtworkListItem(props) {

    // const { isAuthenticated } = useAuth();
    // const [isArtworkFavorited, setIsArtworkFavorited] = useState(false);




    // const handleClickToFav = (item) => {
    //     // const isFavorited = props.favList.filter(el => el._id === item._id);

    //     // if (isFavorited.length) {

    //     //     props.setFavList((prev) => prev.filter((el) => el._id !== item._id));
    //     //     apiServiceJWT.removeFav(props.user._id, item._id);

    //     // } else {

    //     //     props.setFavList((prev) => [...prev, item]);
    //     //     apiServiceJWT.addFav(props.user._id, item);
    //     // }

    // };
    return (
        <div className="bg-white rounded-md p-4 shadow-md mx-auto w-full lg:w-4/5">
            <div className='text-xl font-bold mb-4'>
                <h3>{props.artwork.title}</h3>
            </div>

            <div className='flex flex-col md:flex-row'>
                <div className="mb-4 md:mb-0 md:mr-4">
                    <img className="w-full h-auto rounded-lg md:w-48" src={props.artwork.image} alt="artwork" />
                </div>

                <div className="flex-1">
                    <div className="mb-4">
                        <p className='text-gray-700'>
                            <span className="font-bold">Category:</span> {props.artwork.category}
                        </p>
                        <p className='text-gray-700'>
                            <span className="font-bold">Material:</span> {props.artwork.material}
                        </p>
                    </div>

                    <div className='flex flex-col md:flex-row  mb-4'>
                        <p className='text-lg font-bold mb-2 md:mb-0 md:mr-2'>Price: {props.artwork.price}</p>
                        {/* {isAuthenticated &&
                            <button onClick={() => { handleClickToFav(props.artwork) }} className={`text-xl ${isArtworkFavorited ? 'text-red-500' : 'text-black'}`}>
                                <TiBookmark className="bookmark" />
                            </button>
                        } */}
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <p className='text-gray-700'>{props.artwork.description}</p>
            </div>
        </div>
    )
}
