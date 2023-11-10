import { useEffect, useState } from "react";
import { getArtist } from "../apiService";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/cartContext";


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
                <div key={index} className="artwork-list-container">
                    <div className="img-space">
                        <img className="artwork-img" src={artwork.image} alt="artwork" />
                    </div>
                    <div className="details-container">
                        <div className="artwork-detials">
                            <p>{artwork.title}</p>
                            <p>Desctiption: {artwork.description}</p>
                        </div>

                        <div className="artist-details">
                            <div className="sub-artist-details">
                                <p>{artwork.category}</p>
                                <p>{artwork.material}</p>
                                <p>{artwork.dimensions}</p>
                            </div>

                        </div>
                        <div className="pricing-container">
                            <p>{artwork.price}</p>
                            <button onClick={() => { handleClick(artwork) }}>Add to Cart</button>
                            <button>Bid</button>
                        </div>

                    </div>
                </div>
            )) :
                <p>There are no art pieces available yet</p>}
        </div>
    )
}