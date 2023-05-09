/* PhotoFrameAct defines first the overall frame including captions (PhotoFrame), then imageFrame which defines the image size */
/* PhotoFrameAct is the same as PhotoFrameMany except this has different layout (caption side by side with photos */
/* Although this could be done via css and js, separating them provides flexibility for future major overhaul */
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

import './PhotoFrameAct.css'
import './Main.css'

const PhotoFrameAct = (props) => {
    const photos = props.images.map(image => {
        return (
            <SwiperSlide key={image.id} >
                <div>
                    <img src={image.image} className='imageFrameMany' alt='swiper' />
                </div>
            </SwiperSlide>
        )
    });

    const caption = props.caption;
    const contentType = props.contentType;

    return (
        <div className='photoFrameAct' >
            <Swiper
                cssMode={true}
                rewind={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
            >
            {photos}
            </Swiper>
            <div className='captionFrameMany captionFrameManyTitle'>{contentType}: </div>
            <div className='captionFrameMany'>{caption}</div>
        </div>
    )
}

export default PhotoFrameMany;