import React, { useState } from 'react'
import './PhotoFrame.css'
import './Main.css'

// function importAll(r) {
//     let images = {};
//     r.keys().map(item => { images[item.replace('./', '')] = r(item); });
//     return images;
// }

const PhotoFrame = (props) => {
    const photos = props.image;
    const caption = props.caption;

    // const files = importAll(require.context('./images', false, '/\.jpg/'));

    // console.log('images - ', files);

    // const i = 0;
    // const images = files.map(img => {
    //     i = i + 1;
    //     return (
    //         <div key={i} className='col-6 col-sm-full photoFrame' >
    //             <img src={img} className='imageFrame' alt='uploaded images'/>
    //         </div>
    //     )
    // });

    return (
        <div className='photoFrame' >
            {/* {images} */}
            <img src={photos} className='imageFrame'/>
            <div className='captionFrame'>{caption}</div>
        </div>
    )
}

export default PhotoFrame;