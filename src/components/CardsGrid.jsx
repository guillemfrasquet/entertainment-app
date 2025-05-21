import HorizontalCard from "./HorizontalCard";
import PosterCard from "./PosterCard";

const CardsGrid = ({cardType, title, contents, contentType}) => {
    if(cardType === "poster") {
        return (
            <div className="content-group">
                {title && (
                        <h2>{title}</h2>
                    )
                }
                <div className="popular-grid grid">
                    {contents.map(content => (
                        <PosterCard data={content} contentType={contentType}/>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="content-group">
                {title && (
                        <h2>{title}</h2>
                    )
                }
            <div className="popular-grid grid">
                {contents.map(content => (
                    <HorizontalCard data={content} contentType={contentType}/>
                ))}
            </div>
        </div>
        );
    }
}

export default CardsGrid;