import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/cartContext';
import { RiShoppingBag3Fill, RiQuestionLine } from 'react-icons/ri';
import { BiDollarCircle } from 'react-icons/bi';

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
                                <h1>{artwork.title}</h1>
                                <p>By - <Link to={`/artist/${encodeURIComponent(artwork.artist.name)}`}>{artwork.artist.name} <RiQuestionLine className='questionmark'/></Link></p>
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

                            <div className="artwork-detials">
                                <div className="pricing-container">
                                    <p>{artwork.price}</p>
                                    <button onClick={() => { handleClick(artwork) }}><RiShoppingBag3Fill className="addTobag" /></button>
                                    <button><BiDollarCircle className="bid" /></button>
                                </div>
                                <p className='title'>Description</p>
                                <p  className='title-values'>{artwork.description}</p>
                            </div>
                        </div>
                    </div>
                )) :
                    <p>There are no art pieces available yet</p>}
            </Slider>
        </div>
    )
}