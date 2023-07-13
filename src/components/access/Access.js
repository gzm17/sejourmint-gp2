import React from 'react';
import SectionTitle from '../SectionTitle';

// the following imports contents to populate the textual components
import '../Main.css';
import './Access.css';
import {accessText} from '../../data/access/accessText';

// import bycarPic from '../assets/images/access/bycar.jpg';
// import bytrain1Pic from '../assets/images/access/bytrain-shinkansen.jpg';
// import bytrain2Pic from '../assets/images/access/bytrain-azusa.jpg';
// import bybusPic from '../assets/images/access/bybus.jpg';

// This lays out the main page, including the header (navbar), footer, and everything in between
// All contents are in terms of components, with Main as the mother of components 

function Access(props) {

    // Prepare headings for bilingual 
    // set language icon, menu items and texts based on the language state from props.language
    var accessHeading = '', busHeading = '', trainHeading = '', carHeading = '', airHeading = '', bybusText, bytrainText, bycarText, byairText;
    if (props.language === 'en') {
        accessHeading = 'Access to the Hotel';
    } else if (props.language === 'jp') {
        accessHeading = 'ホテルへのアクセス';
    } else if (props.language === 'ch1') {
        accessHeading = '到达旅馆的交通方式';
    } else if (props.language === 'ch2') {
        accessHeading = '到達旅館的交通方式';
    } else {}
    
    /* swiper add: This block code processes the Room Types Section (roomtypes.js), prepares PhotoFrameMany components */
    const accessContent = accessText.map(accessType => {
        var heading = '';
        if (props.language === 'en' && accessType.title !== '' ) { heading = accessType.title; }
        else if (props.language === 'jp' && accessType.title !== ''  ) { heading = accessType.titleJ; }
        else if (props.language === 'ch1' && accessType.title !== '' ) { heading = accessType.titleCh1; }
        else if (props.language === 'ch2' && accessType.title !== '' ) { heading = accessType.titleCh2; }
        else {}

        const paragraphs = accessType.paragraphs.map(paragraph => {
            var pText = '';
            if (props.language === 'en' ) { pText = paragraph.text; }
            else if (props.language === 'jp' ) { pText = paragraph.textJ; }
            else if (props.language === 'ch1' ) { pText = paragraph.textCh1; }
            else if (props.language === 'ch2' ) { pText = paragraph.textCh2; }
            else {}
            return (
                <div key={paragraph.id}>
                    <p>{pText}</p> 
                </div>
            )
        })

        return (
            <div key={accessType.id} className='accessSection'>
                {accessType.title === '' ? 
                <div className='accessSectionImageAndText'>
                    <img src={process.env.PUBLIC_URL+accessType.image} className='sectionImage0' alt={accessType.title}/>
                    <div className='accessSectionText0'>
                        {paragraphs}
                    </div>
                </div>
                :
                <div className='accessSectionImageAndText'>
                    <div className='accessSectionTitle'>{heading}</div>
                    <img src={process.env.PUBLIC_URL+accessType.image} className='accessSectionImage' alt={accessType.title}/>
                    <div className='accessSectionText'>
                        {paragraphs}
                    </div>
                </div> }
            </div>
        )
    })

    return (
        <div className='accessContainer'>
        { /*<div className='background'>
            <Header /> */ }

            {/* This block is rendering of rooms section of the page */}
            <SectionTitle ids='access' title={accessHeading} />

            {/* This block is rendering of amenitites of the rooms section */}
            {accessContent}

            <div className='sectionEnd'>{}</div>

        </div>
    )
}

export default Access;