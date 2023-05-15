import React from 'react';
// The following imports the components for presentation
import Header from './Header';
import Footer from './Footer';
import PhotoFrame from './PhotoFrame';
import PhotoFrameMany from './PhotoFrameMany';
import ContactUs from './ContactUs';
import Gallery from './gallery/GalleryHeader';
import SectionTitle from './SectionTitle';
import SectionText from './SectionText';

// the following imports contents to populate the textual components
import './Main.css';
import {mainFeatureText} from '../data/mainFeature/mainFeatureText.js';
import {welcomeText} from '../data/mainFeature/mainFWelcomeText.js';
import {convenienceText} from '../data/features/convenienceText.js';
import {roomsMainText} from '../data/rooms/roomsMainText';
import {foodsMainText} from '../data/foods/foodsMainTextv2';
import {activitiesMainText} from '../data/activities/activitiesMainTextv2';
import {voicesText} from '../data/voices/voices';

// Swiper add 
// the following imports images to populate the image frames (PhotoFrame and PhotoFrameMany)
import {features} from '../data/features/features.js';
import {roomType} from '../data/rooms/roomTypes1';
import {foods} from '../data/foods/foods';
import {activities} from '../data/activities/activities';

// import images
import topImage from '../assets/images/mainFeature/mf-win-back.jpg';
import welcome1 from '../assets/images/mainFeature/mf-welcome1.jpg';
import welcome2 from '../assets/images/mainFeature/mf-welcome2.jpg';
import welcome3 from '../assets/images/mainFeature/mf-welcome3.jpg';
import feature1 from '../assets/images/features/f1-goryu-night.jpg';
import feature2 from '../assets/images/features/f2-ski-ita.jpg';
import feature3 from '../assets/images/features/f3-choukokuji.jpg';

import foods1 from '../assets/images/foods/foods-dinner.jpg';
import foods2 from '../assets/images/foods/foods-diningRm.jpg';
import foods3 from '../assets/images/foods/foods-beer.jpg';

import act1 from '../assets/images/activities/activities-1.jpg';
import act2 from '../assets/images/activities/activities-2.jpg';
import act3 from '../assets/images/activities/activities-3.jpg';
import act4 from '../assets/images/activities/activities-4.jpg';


// This lays out the main page, including the header (navbar), footer, and everything in between
// All contents are in terms of components, with Main as the mother of components 

function Main(props) {

    // Prepare headings for bilingual 
    // set language icon and menu items based on the language state from props.language
    var featureHeading = '', roomsHeading = '', foodHeading = '', actHeading = '', 
        galleryHeading = '', contactHeading = '', galleryHeading = '', welcomeHeading = '', welcome, convenience, foodndrinks, activities, voices;
    if (props.language === 'en') {
        welcomeHeading = 'Welcome to Hotel Sejour Mint';
        featureHeading = 'Convenience';
        roomsHeading = 'Rooms and Amenities';
        foodHeading = 'Food and Drink';
        actHeading = 'Activities';
        galleryHeading = 'Gallery';
        contactHeading = 'Contact Us';
        voices = 'Customer Voices'
    } else if (props.language === 'jp') {
        welcomeHeading = 'ようこそ、ホテルセジュールミントへ';
        featureHeading = '便利性';
        roomsHeading = '部屋とアメニティー';
        foodHeading = '食べ物と飲み物';
        actHeading = 'アクテビティ';
        galleryHeading = 'ギャラリー';
        contactHeading = '問い合わせ';
        voices = '顧客の声';
    } else if (props.language === 'ch1') {
        welcomeHeading = '欢迎到 旅家酒店';
        featureHeading = '便利性';
        roomsHeading = '客房及附带服务';
        foodHeading = '食物和饮料';
        actHeading = '活动';
        galleryHeading = '画廊';
        contactHeading = '询问';
        voices = '客户反馈';
    } else if (props.language === 'ch2') {
        welcomeHeading = '歡迎到 旅家酒店';
        featureHeading = '便利性';
        roomsHeading = '客房及附帶服務';
        foodHeading = '食物和飲料';
        actHeading = '活動';
        galleryHeading = '畫廊';
        contactHeading = '詢問';
        voices = '客戶反饋';
    } else {}



    // Welcome Text - next to three photos 
    if (props.language === 'en') {
        welcome = welcomeText.text;
        convenience = convenienceText.text;
        foodndrinks = foodsMainText.text;
        activities = activitiesMainText.text;
    } else if (props.language === 'jp') {
        welcome = welcomeText.textJ;
        convenience = convenienceText.textJ;
        foodndrinks = foodsMainText.textJ;
        activities = activitiesMainText.textJ;
    } else if (props.language === 'ch1') {
        welcome = welcomeText.textCh1;
        convenience = convenienceText.textCh1;
        foodndrinks = foodsMainText.textCh1;
        activities = activitiesMainText.textCh1;
    } else if (props.language === 'ch2') {
        welcome = welcomeText.textCh2;
        convenience = convenienceText.textCh2;
        foodndrinks = foodsMainText.textCh2;
        activities = activitiesMainText.textCh2;
    } else {};

    /* This block code processes the features file and compile jsx for rendering (return below) */
    const featureImages = features.map(image => {
        return (
            <div key={image.id} className='col-6 col-md-full col-sm-full'>
                {props.language === 'en' ? 
                <div className='photoFrameManyContainer1'>
                    <PhotoFrame key={image.id} image={image.image} caption={image.text} /></div> :
                <div className='photoFrameManyContainer1'>
                    <PhotoFrame key={image.id} image={image.image} caption={image.textJ} /></div> }
            </div>
        )
    })

    /* swiper add: This block code processes the Room Types Section (roomtypes.js), prepares PhotoFrameMany components */
    const roomsContent = roomType.map(room => {
        var caption = '';
        if (props.language === 'en' ) { caption = room.caption; }
        else if (props.language === 'jp' ) { caption = room.captionJ; }
        else if (props.language === 'ch1' ) { caption = room.captionCh1; }
        else if (props.language === 'ch2' ) { caption = room.captionCh2; }
        else {}

        return (
            <div key={room.id} className='col-6 col-md-full col-sm-full'>
                <div className='photoFrameManyContainer1'>
                    <PhotoFrameMany images={room.images} caption={caption} contentType={room.name} fontIsBlack='false'/></div> 
            </div>
        )
    })

    /* swiper add: This block code processes the Foods Section (foods.js), prepares PhotoFrameMany components */
    const foodsContent = foods.map(food => {
        return (
            <div key={food.id} className='col-6 col-md-full col-sm-full'>
                { props.language === 'en' ?
                <div className='photoFrameManyContainer1'>
                    <PhotoFrameMany images={food.images} caption={food.caption} contentType={food.name} fontIsBlack='false'/></div> :
                <div className='photoFrameManyContainer1'>
                    <PhotoFrameMany images={food.images} caption={food.captionJ} contentType={food.nameJ} fontIsBlack='false'/></div> }
            </div>
        )
    })

    /* swiper add: This block code processes the Activities Section (activities.js), prepares PhotoFrameMany components */
    // const activitiesContent = activities.map(act => {
    //     return (
    //         <div key={act.id} className='col-6 col-md-full col-sm-full'>
    //             { props.language === 'en' ?
    //             <div className='photoFrameManyContainer1'>
    //                 <PhotoFrameMany images={act.images} caption={act.caption} contentType={act.name} fontIsBlack='false'/></div> :
    //             <div className='photoFrameManyContainer1'>
    //                 <PhotoFrameMany images={act.images} caption={act.captionJ} contentType={act.nameJ} fontIsBlack='false' /></div> }
    //         </div>
    //     )
    // })

    return (
        <div>
        { /*<div className='background'>
            <Header /> */ }

            {/* The following div is for the main image - which later may become a set of images or video clip */}
            <div className='mainFeatureImg'>
                <img src={topImage} className='featureImgFrame' alt='Hotel Sejour Mint Winter 05 - import ' />

                {/* <img src='%PUBLIC_URL%/assets/images/mainFeature/mf-win-back.jpg' className='featureImgFrame' alt='Hotel Sejour Mint Winter 04' /> */}
            </div>

            {/* Inserts the summary text */}
            {/* <SectionText text={mainFeatureText} language={props.language}/> */}

            {/* main feature second photo - may not be needed */}
            {/* <div className='mainFeatureImg2'>
                <img src='assets/images/mainFeature/mf-win-stove.jpg' className='featureImgFrame2' alt='Hotel Sejour Mint Winter 2' />
            </div>
            <div className='sectionEnd'></div> */}

            {/* Group1 Feature: Hotel Welcome Section with three photos */}
            <SectionTitle ids='welcome' title={welcomeHeading} />
            <div className='mainFeatureGroup1'>
                <img src={welcome1} className='mainFeatureGroup1Image1' alt='Welcome 1' />
                {/* <img src='../../assets/images/mainFeature/mf-welcome1.jpg' className='mainFeatureGroup1Image1' alt='Hotel Sejour Mint Winter 2' /> */}
                <div className='mainFeatureGroup1Text'> {welcome}
                    {/* <SectionText text={mainFeatureText} language={props.language}/> */}
                </div>
                <img src={welcome2} className='mainFeatureGroup1Image2' alt='Welcome 2' />
                {/* <img src='../../assets/images/mainFeature/mf-welcome2.jpg' className='mainFeatureGroup1Image2' alt='Hotel Sejour Mint Winter 2' /> */}
                <img src={welcome3} className='mainFeatureGroup1Image3' alt='Welcome 3' />
                {/* <img src='../../assets/images/mainFeature/mf-welcome3.jpg' className='mainFeatureGroup1Image3' alt='Hotel Sejour Mint Winter 2' /> */}
            </div>
            <div className='sectionEnd'>{}</div>

            {/* Group2 Feature: This block is features group of photos and texts */}
            <SectionTitle ids='features' title={featureHeading} />
            <div className='mainFeatureGroup2'>
                <div className='mainFeatureGroup2Text'> {convenience}
                </div>
                <img src={feature1} className='mainFeatureGroup2Image1' alt='Feature 1' />
                <img src={feature3} className='mainFeatureGroup2Image3' alt='Feature 3' />
                <img src={feature2} className='mainFeatureGroup2Image2' alt='Feature 2' />
                {/* <img src='../../assets/images/features/f1-goryu-night.jpg' className='mainFeatureGroup2Image1' alt='Hotel Sejour Mint Winter 2' />
                <img src='../../assets/images/features/f3-choukokuji.jpg' className='mainFeatureGroup2Image3' alt='Hotel Sejour Mint Winter 2' />
                <img src='../../assets/images/features/f2-ski-ita.jpg' className='mainFeatureGroup2Image2' alt='Hotel Sejour Mint Winter 2' /> */}
            </div>
            <div className='sectionEnd'>{}</div>

            {/* {featureImages} */}

            {/* This block is features group of photos and texts */}
            {/* <SectionTitle ids='features' title={featureHeading} />
            <div className='sectionEnd'>{featureImages}</div> */}
            {/* {featureImages} */}

            {/* This block is rendering of rooms section of the page */}
            <SectionTitle ids='rooms' title={roomsHeading} />
            <div className='sectionMain'>
                <SectionText text={roomsMainText} language={props.language} />
            </div>
            <div className='sectionEnd sectionMain' >{roomsContent}</div>

            {/* Food and Drinks section: This is the second version. Once we have determined the 
            food and drinks, esp after the bar is complete, this will be updated. For now this is
            a placeholder but with real information */}
            <SectionTitle ids='foods' title={foodHeading} />
            <div className='foodGroup'>
                <img src={foods1} className='foodGroupImage1' alt='Foods Dinner' />
                <img src={foods2} className='foodGroupImage2' alt='Foods Dinning Room' />
                <img src={foods3} className='foodGroupImage3' alt='Foods Beer' />
                {/* <img src='../../assets/images/foods/foods-dinner.jpg' className='foodGroupImage1' alt='Foods Dinner' />
                <img src='../../assets/images/foods/foods-diningRm.jpg' className='foodGroupImage2' alt='Foods Dinning Room' />
                <img src='../../assets/images/foods/foods-beer.jpg' className='foodGroupImage3' alt='Foods Beer' /> */}
                <div className='foodGroupText'> {foodndrinks}</div>
            </div>
            <div className='sectionEnd'>{}</div>


            {/* This block is rendering of foods section of the page */}
            {/* <SectionTitle ids='foods' title={foodHeading} />
            <div className='sectionEnd'></div>
            <div className='sectionMain'>
                <SectionText text={foodsMainText} language={props.language} />
            </div>
            <div className='sectionEnd sectionMain'>{foodsContent}</div> */}

            {/* Activities section: This is the second version. Right now, this is a teaser. Later versions: upon clicking, will open up further details on particular activities */}
            <SectionTitle ids='activities' title={actHeading} />
            <div className='activitiesMasterGroup'>
                <div className='activitiesImageGroup'>
                    <img src={act1} className='activitiesImage1' alt='Act 1' />
                    <img src={act2} className='activitiesImage2' alt='Act 2' />
                    <img src={act3} className='activitiesImage3' alt='Act 3' />
                    <img src={act4} className='activitiesImage4' alt='Act 4' />
                    {/* <img src='../../assets/images/activities/activities-1.jpg' className='activitiesImage1' alt='Act 1' />
                    <img src='../../assets/images/activities/activities-2.jpg' className='activitiesImage2' alt='Act 2' />
                    <img src='../../assets/images/activities/activities-3.jpg' className='activitiesImage3' alt='Act 3' />
                    <img src='../../assets/images/activities/activities-4.jpg' className='activitiesImage4' alt='Act 4' /> */}
                </div>
                <div className='activitiesText'> {activities}</div>
            </div>
            <div className='sectionEnd'>{}</div>

            {/* Customer voices: This section lists a few samples of customer feedback  */}
            <div style={{backgroundColor: 'rgb(255, 242, 230)'}}>
                <SectionTitle ids='voices' title={voices} />
                <div className='voicesGroup'>

                        <div className='voiceBox'>
                            <div className='voice'>{voicesText.v1}</div>
                            <div className='voiceName'>{voicesText.v1name}</div>
                        </div>

                        <div className='voiceBox'>
                            <div className='voice'>{voicesText.v2}</div>
                            <div className='voiceName'>{voicesText.v2name}</div>
                        </div>

                        <div className='voiceBox'>
                            <div className='voice'>{voicesText.v3}</div>
                            <div className='voiceName'>{voicesText.v3name}</div>
                        </div>

                        <div className='voiceBox'>
                        <div className='voice'>{voicesText.v4}</div>
                        <div className='voiceName'>{voicesText.v4name}</div>
                        </div>

                        <div className='voiceBox'>
                            <div className='voice'>{voicesText.v5}</div>
                            <div className='voiceName'>{voicesText.v5name}</div>
                        </div>

                </div>
                <div className='sectionEnd'>{}</div>
            </div>

            {/* This block is rendering of activities section of the page */}
            {/* <SectionTitle ids='activities' title={actHeading} />
            <div className='sectionEnd'></div>
            <div className='sectionMain'>
                <SectionText text={activitiesMainText} language={props.language} />
            </div>
            <div className='sectionEnd sectionMain'>{activitiesContent}</div> */}

            {/* This block is rendering of  Contact Us section at the end of the page */}
            {/* <ContactUs ids='contactUs' title='Contact Us' />
            <div className='sectionEnd'></div> */}

            {/* <Footer /> */}
        </div>
    )
}

export default Main;