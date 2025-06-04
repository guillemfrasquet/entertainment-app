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
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(208px,_1fr))] cursor-pointer">
                    {contents.map(content => {
                        let type = contentType;
                        if (contentType === "multi") {
                        type = content.media_type;
                        }

                        return (
                        <PosterCard
                            key={content.id}
                            data={content}
                            contentType={type}
                            textPosition={textPosition}
                        />
                        );
                    })}
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
            <div className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] cursor-pointer">
                {contents.map(content => {
                        let type = contentType;
                        if (contentType === "multi") {
                        type = content.media_type;
                        }

                        return (
                        <HorizontalCard
                            key={content.id}
                            data={content}
                            contentType={type}
                            textPosition={textPosition}
                        />
                        );
                    })}
            </div>
        </div>
        );
    }
}

export default CardsGrid;