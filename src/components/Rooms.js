import React from 'react';
import PhotoFrameMany from './PhotoFrameMany';
import SectionTitle from './SectionTitle';
import SectionText from './SectionText';

// the following imports contents to populate the textual components
import './Main.css';
import './Rooms.css';
import {roomsMainText} from '../data/rooms/roomsMainText';

import amenity1 from '../assets/images/rooms/amenity-unitBath2.jpg';
import amenity2 from '../assets/images/rooms/amenity-kettle1.jpg';
import amenity3 from '../assets/images/rooms/amenity-jpBath1.jpg';
import amenity4 from '../assets/images/rooms/amenity-sharedToilet1.jpg';

// Swiper add 
// the following imports images to populate the image frames (PhotoFrame and PhotoFrameMany)
import {roomType2} from '../data/rooms/roomTypes2';

// This lays out the main page, including the header (navbar), footer, and everything in between
// All contents are in terms of components, with Main as the mother of components 

function Rooms(props) {

    // Prepare headings for bilingual 
    // set language icon, menu items and texts based on the language state from props.language
    var roomsHeading = '', amenityHeading = '', rooms = '', amenities1 = '', amenities2 = '';
    if (props.language === 'en') {
        roomsHeading = 'Rooms';
        rooms = roomsMainText[0].text;
        amenityHeading = 'Amenities';
        amenities1 = roomsMainText[1].text;
        amenities2 = roomsMainText[2].text;

    } else if (props.language === 'jp') {
        roomsHeading = '部屋';
        rooms = roomsMainText[0].textJ;
        amenityHeading = 'アメニティー';
        amenities1 = roomsMainText[1].textJ;
        amenities2 = roomsMainText[2].textJ;
    } else if (props.language === 'ch1') {
        roomsHeading = '客房';
        rooms = roomsMainText[0].textCh1;
        amenityHeading = '附带服务设施';
        amenities1 = roomsMainText[1].textCh1;
        amenities2 = roomsMainText[2].textCh1;
        
    } else if (props.language === 'ch2') {
        roomsHeading = '客房';
        rooms = roomsMainText[0].textCh2;
        amenityHeading = '附帶服務設施';
        amenities1 = roomsMainText[1].textCh2;
        amenities2 = roomsMainText[2].textCh2;
    } else {}

    /* swiper add: This block code processes the Room Types Section (roomtypes.js), prepares PhotoFrameMany components */
    const roomsContent = roomType2.map(room => {
        var caption = '';
        if (props.language === 'en' ) { caption = room.caption; }
        else if (props.language === 'jp' ) { caption = room.captionJ; }
        else if (props.language === 'ch1' ) { caption = room.captionCh1; }
        else if (props.language === 'ch2' ) { caption = room.captionCh2; }
        else {}

        return (
            <div key={room.id} className='col-6 col-md-full col-sm-full'>
                <div className='photoFrameManyContainer1'>
                    <PhotoFrameMany images={room.images} caption={caption} contentType={room.name} fontIsBlack='false'/>
                </div> 
            </div>
        )
    })

    return (
        <div className='roomsContainer'>
        { /*<div className='background'>
            <Header /> */ }

            {/* This block is rendering of rooms section of the page */}
            <SectionTitle ids='rooms' title={roomsHeading} />
            <div className='sectionMain'>
                <SectionText text={roomsMainText} language={props.language} />
            </div>
            <div className='sectionEnd sectionMain' >{roomsContent}</div> 

            {/* This block is rendering of amenitites of the rooms section */}
            <SectionTitle ids='amenities' title={amenityHeading} />
            <div className='amenityGroup1'>
                <img src={amenity1} className='amenityGroupImage1' alt='Amenity 1' />
                <img src={amenity2} className='amenityGroupImage2' alt='Amenity 2' />
                <div className='amenityGroupText1'> {amenities1} </div>
            </div>
            <div className='amenityGroup2'>
                <div className='amenityGroupText2'> {amenities2} </div>
                <img src={amenity3} className='amenityGroupImage3' alt='Amenity 3' />
                <img src={amenity4} className='amenityGroupImage4' alt='Amenity 4' />
            </div>

            <div className='sectionEnd'>{}</div>

        </div>
    )
}

export default Rooms;