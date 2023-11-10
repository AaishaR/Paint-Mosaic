import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/cartContext';


export default function ArtworkSlider({ artworks }) {

    const { addToCart } = useCart();

    const handleClick = (item) => {
        // console.log('Handling click for item:', item);
        addToCart(item);
    }


    const SliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    return (
        <div className="artwork-container">
            <Slider {...SliderSettings}>
                {artworks.length ? artworks.map((artwork, index) => (
                    <div key={index} className="artwork-slide">
                        <div className="img-space">
                            <img className="artwork-img" src={artwork.image} alt="artwork" />
                        </div>
                        <div className="details-container">
                            <div className="artist-details">
                                <Link to={`/artist/${encodeURIComponent(artwork.artist.name)}`}><p>{artwork.artist.name}</p></Link>
                                <p>{artwork.title}</p>
                                <div className="sub-artist-details">
                                    <p>{artwork.category}</p>
                                    <p>{artwork.material}</p>
                                    <p>{artwork.dimensions}</p>
                                </div>

                            </div>

                            <div className="artwork-detials">
                                <div className="pricing-container">
                                    <p>{artwork.price}</p>
                                    <button onClick={() => { handleClick(artwork) }}>Add to Cart</button>
                                    <button>Bid</button>
                                </div>
                                <p>{artwork.description}</p>
                            </div>
                        </div>
                    </div>
                )) :
                    <p>There are no art pieces available yet</p>}
            </Slider>
        </div>
    )
}