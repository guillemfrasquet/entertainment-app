import Carousel from "../components/Carousel";
import useFetchList from "../hooks/useFetchList";

const SectionCarousel = ({title, apiUrl, contentType, cardType = "horizontal", limit}) => {
    const token = process.env.REACT_APP_TMDB_API_TOKEN;
    const data = useFetchList(apiUrl, token);

    return (
        <Carousel
            title={title}
            contents={data}
            contentType={contentType}
            cardType={cardType}
            limit={limit}
        />
    );
};

export default SectionCarousel;