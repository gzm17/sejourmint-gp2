import React, {useRef, useEffect,useState} from 'react';
import { Outlet, Link } from "react-router-dom";

// The following imports the components for presentation
import Header from '../Header';
import Footer from '../Footer';
import './GalleryHeader.css';

function GalleryHeader(props) {
    // Prepare bilingual titles
    var gallery, hotel, rooms, winter, spring, summer, fall, videos;
    if (props.language === 'en') {
        gallery = 'Gallery';
        hotel = 'Hotel';
        rooms = 'Rooms';
        winter = 'Winter';
        spring = 'Spring';
        summer = 'Summer';
        fall = 'Fall';
        videos = 'Videos';
    } else if (props.language === 'jp') {
        gallery = 'ギャラリー';
        hotel = 'ホテル';
        rooms = '部屋';
        winter = '冬';
        spring = '春';
        summer = '夏';
        fall = '秋';
        videos = '映像';
    } else if (props.language === 'ch1') {
        gallery = '画廊';
        hotel = '旅馆';
        rooms = '客房';
        winter = '冬';
        spring = '春';
        summer = '夏';
        fall = '秋';
        videos = '视频';
    } else if (props.language === 'ch2') {
        gallery = '畫廊';
        hotel = '旅館';
        rooms = '客房';
        winter = '冬';
        spring = '春';
        summer = '夏';
        fall = '秋';
        videos = '視頻';
    } else {};


    const [menuItem, setMenuItem] = useState('hotel');
    const menuItemRef = useRef(null);

    useEffect(()=>{
        menuItemRef.current.focus();
    },[menuItem])

    function handleClick(itemId) {
        console.log(itemId);
        const menuItem = document.getElementById(itemId)
        menuItemRef.current = menuItem;
        menuItemRef.current.focus();
        setMenuItem(itemId);
    }

    return (
        <div id='gallery' className='galleryHeaderFrame'>
            <h2 className='title'> {gallery} </h2>

            <div className='galleryMenu'>
                <Link to='hotel' id='hotel' className='menuItem' ref={menuItemRef} onClick={()=>handleClick('hotel')} >{hotel}</Link>
                <Link to='rooms' id='rooms' className='menuItem' onClick={()=>handleClick('rooms')}>{rooms}</Link>
                <Link to='winter' id='winter' className='menuItem' onClick={()=>handleClick('winter')} >{winter}</Link>
                <Link to='spring' id='spring' className='menuItem' onClick={()=>handleClick('spring')}>{spring}</Link>
                <Link to='summer' id='summer' className='menuItem' onClick={()=>handleClick('summer')}>{summer}</Link>
                <Link to='fall' id='fall' className='menuItem' onClick={()=>handleClick('fall')}>{fall}</Link>
                <Link to='videos' id='videos' className='menuItem' onClick={()=>handleClick('videos')}>{videos}</Link>
            </div>
            <Outlet/>
        </div>
    )
}

export default GalleryHeader;