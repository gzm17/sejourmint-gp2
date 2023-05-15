/* PhotoFrameMany defines first the overall frame including captions (PhotoFrame), then imageFrame which defines the image size */
/* PhotoFrameMany is the same as PhotoFrame except this frame contains many scrollable photos */
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

import './PhotoFrameMany.css'
import './Main.css'

const PhotoFrameMany = (props) => {
    const photos = props.images.map(image => {
        const filename = image.image.split('/');
        return (
            <SwiperSlide key={image.id} >
                <div>
                    <img src={process.env.PUBLIC_URL+image.image} className='imageFrameMany' alt={'swiper-'+filename[filename.length-1]} />

                    {/* <img src={image.image} className='imageFrameMany' alt='swiper' /> */}
                </div>
            </SwiperSlide>
        )
    });

    const caption = props.caption;
    const contentType = props.contentType;

    return (
        <div data-fontisblack='false' className='photoFrameMany' >
            <Swiper
                cssMode={true}
                rewind={true}
                navigation={true}
                // navigation={{
                //     nextEl: ".image-swiper-button-next",
                //     prevEl: ".image-swiper-button-prev",
                //     disabledClass: "swiper-button-disabled"
                //   }}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                style={{
                    // "--swiper-navigation-color": "grey",
                    "--swiper-navigation-size": "25px",
                  }}
                className="mySwiper"
            >
            {photos}
            </Swiper>
            <div data-fontisblack={props.fontIsBlack} className='captionFrameMany captionFrameManyTitle'>{contentType} </div>
            <div data-fontisblack={props.fontIsBlack} className='captionFrameMany'>{caption}</div>
        </div>
    )
}

export default PhotoFrameMany;