// This component autodisplays selected photos in the openning of the website
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import {Pagination, Autoplay } from "swiper";

import './PhotoAutoplay.css'
// import './Main.css'

const PhotoAutoplay = (props) => {
    const photos = props.images.map(image => {
        const filename = image.image.split('/');
        return (
            <SwiperSlide key={image.id} >
                <div>
                    <img src={process.env.PUBLIC_URL+image.image} className='imageRollFrame' style={{ width: 'auto', height: 'auto' }} alt={'swiper-'+filename[filename.length-1]} />
                </div>
            </SwiperSlide>
        )
    });

    return (
        <div data-fontisblack='false' className='photoRollContainer' >
            <Swiper
                cssMode={true}
                rewind={true}
                pagination={true}
                autoplay={{ delay: 3000 }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
            {photos}
            </Swiper>
        </div>
    )
}

export default PhotoAutoplay;