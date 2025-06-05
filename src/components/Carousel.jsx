import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import HorizontalCard from "./HorizontalCard";
import PosterCard from "./PosterCard";

import { Navigation } from "swiper/modules";

export default function Carousel({cardType, title, contents, contentType, textPosition}) {
  
    if(cardType === "poster") {
        return (
            <>
        {title && (
                <h2 className="text-3xl font-extralight pb-4">{title}</h2>
            )
        }
        <div className="relative mb-10">
        <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            breakpoints={{
                0: {
                    slidesPerView: 1.5,
                },
                580: {
                    slidesPerView: 2.5,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
                1280: {
                    slidesPerView: 5,
                },
                1536: {
                    slidesPerView: 6,
                },
                1800: {
                    slidesPerView: 7,
                },
            }}
            watchOverflow={true}
            slidesPerGroup={1}
            loop={false}
            className="!m-[-15px] !p-[15px]"
        >
            {contents.map(content => (
            <SwiperSlide className="!overflow-visible">
                <div className="relative z-10">
                <PosterCard data={content} contentType={contentType} textPosition={textPosition}/>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>

        </div>
        </>
        );
    } else if(cardType === "horizontal") {
        return (
            <>
        {title && (
                <h2 className="text-3xl font-extralight pb-4">{title}</h2>
            )
        }
        <div className="relative mb-10">
        <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                },
                400: {
                    slidesPerView: 1.1,
                },
                768: {
                    slidesPerView: 2,
                },
                1000: {
                    slidesPerView: 2.5,
                },
                1150: {
                    slidesPerView: 3,
                },
                1500: {
                    slidesPerView: 4,
                    },
                1800: {
                    slidesPerView: 5,
                },
            }}
            watchOverflow={true}
            slidesPerGroup={1}
            loop={false}
            className="!m-[-15px] !p-[15px]"
        >
            {contents.map(content => (
            <SwiperSlide className="!overflow-visible">
                <div className="relative z-10">
                <HorizontalCard data={content} contentType={contentType} textPosition={textPosition}/>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>

        </div>
        </>
        );
    }
    
  
}
