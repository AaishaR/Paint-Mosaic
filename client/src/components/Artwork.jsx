import ArtworkSliderCard from './Home/ArtworkSliderCard';
import ArtworkListItem from './Artist/ArtworkListItem';

export default function Artwork(props) {

    // useEffect(() => {
    //     let newArr = props.favList.filter(el => el._id === props.artwork._id); 
    //     setIsArtworkFavorited(newArr.length) 

    //     // eslint-disable-next-line
    // }, [props.favList]) 

    return (
        <>
            {props.slider ?

                <ArtworkSliderCard artwork={props.artwork} />
                :
                <ArtworkListItem artwork={props.artwork} />}
        </>


    )
}