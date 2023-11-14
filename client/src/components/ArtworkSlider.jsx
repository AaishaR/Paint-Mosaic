import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Artwork from './Artwork';


// import { useFavourite } from '../contexts/favouriteContext';


export default function ArtworkSlider(props) {

    // const [favoritedArtworks, setFavoritedArtworks] = useState([]);

    

    const isArtworkFavorited = (artwork) => {
        
        props.favList.filter(el => el._id === artwork._id);
    }

    console.log(isArtworkFavorited.length)
    


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
                {props.artworks.length ? props.artworks.map((artwork, index) => (
                    <Artwork key={index} artwork={artwork} favList={props.favList} setFavList={props.setFavList} user={props.user} />
                )) :
                    <p>There are no art pieces available yet</p>}
            </Slider>
        </div>
    )
}