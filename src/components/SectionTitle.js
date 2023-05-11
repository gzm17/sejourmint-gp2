import React from 'react';
import './SectionTitle.css';
import svgwinter from '../assets/images/icons/icon-winter.png';
import svgspring from '../assets/images/icons/icon-spring.png';
import svgsummer from '../assets/images/icons/icon-summer.png';
import svgfall from '../assets/images/icons/icon-fall.png';

// import TitleImage from 'assets/images/icons/snowflake0.svg'; <== This cannot resolve: WHY?

const SectionTitle = (props) => {
    const titleText = props.title;
    const id = props.ids;

    return (
        <div id={id} className='sectionTitle'>
            <img className='sectionTitleImg' src={svgwinter} alt='feature title svg'/>
            <img className='sectionTitleImg' src={svgspring} alt='feature title svg'/>
            <img className='sectionTitleImg' src={svgsummer} alt='feature title svg'/>
            <img className='sectionTitleImg' src={svgfall} alt='feature title svg'/>
            {/* <img className='sectionTitleImg' src='../assets/images/icons/icon-winter.svg' alt='feature title svg'/>
            <img className='sectionTitleImg' src='../assets/images/icons/icon-spring.svg' alt='feature title svg'/>
            <img className='sectionTitleImg' src='../assets/images/icons/icon-summer.svg' alt='feature title svg'/>
            <img className='sectionTitleImg' src='../assets/images/icons/icon-fall.svg' alt='feature title svg'/> */}
        <p className='sectionTitleText'>{titleText}</p>
    </div>
    )
}

export default SectionTitle;