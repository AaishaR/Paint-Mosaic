import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Artwork from './Artwork';

export default function ArtworkSlider(props) {

    const SliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,    
        autoplaySpeed: 5000
    };

    return (
        <div className="artwork-container">
            <Slider {...SliderSettings}>
                {props.artworks.length ? props.artworks.map((artwork, index) => (
                    <Artwork key={index} artwork={artwork} favList={props.favList} setFavList={props.setFavList} user={props.user} slider={true} isAuthenticated={props.isAuthenticated} />
                )) :
                    <p>There are no art pieces available yet</p>}
            </Slider>
        </div>
    )
}