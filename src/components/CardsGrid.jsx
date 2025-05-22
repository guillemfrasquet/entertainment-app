import HorizontalCard from "./HorizontalCard";
import PosterCard from "./PosterCard";

const CardsGrid = ({cardType, title, contents, contentType, textPosition, limit}) => {
    if(limit) {
        contents = contents.slice(0, limit);
    }

    if(cardType === "poster") {
        return (
            <div className="content-group mb-10">
                {title && (
                        <h2 className="text-3xl font-extralight pb-4">{title}</h2>
                    )
                }
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,_minmax(208px,_1fr))] cursor-pointer">
                    {contents.map(content => (
                        <PosterCard data={content} contentType={contentType} textPosition={textPosition}/>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="content-group mb-10">
                {title && (
                        <h2 className="text-3xl font-extralight pb-4">{title}</h2>
                    )
                }
            <div className="grid gap-6 grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] cursor-pointer">
                {contents.map(content => (
                    <HorizontalCard data={content} contentType={contentType} textPosition={textPosition}/>
                ))}
            </div>
        </div>
        );
    }
}

export default CardsGrid;