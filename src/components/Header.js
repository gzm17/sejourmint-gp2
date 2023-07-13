import React, { useState } from 'react'
import { Outlet, Link } from "react-router-dom";
// this package allows scrolling to anywhere in a page, see code below. Link is native to react-router, which doesnt do this
import { HashLink as Link1 } from 'react-router-hash-link';
import './Main.css'
import './Header.css'

const Header = (props) => {

    // BEGIN - This block of code changes the opacity of the top bar upon scrolling
    const [topbarIsOpague, setTopbarIsOpague] = useState(false);
    const changeTopbarColor = () => {
        if (window.scrollY >= 45 ) {
            setTopbarIsOpague(true);
            document.getElementById('hotelName').style.color = '#00709e';
            document.getElementById('langWord').style.color = '#00709e';
        } else {
            setTopbarIsOpague(false);
            document.getElementById('hotelName').style.color = 'rgb(242, 180, 34)';
            document.getElementById('langWord').style.color = 'rgb(242, 180, 34)';
        }
    }

    window.addEventListener('scroll', changeTopbarColor);
    // END

    const changeLang = (lang) => {
        props.changeLanguage(lang);
    }

    // set language icon and menu items based on the language state from props.language
    var langIcon = '', langWord = '', featureHeading = '', roomsHeading = '', foodHeading = '', actHeading = '', 
        galleryHeading = '', contactHeading = '', bookHeading = '', galleryHeading = '', accessHeading = '';
    // console.log('language seen in header = ', props.language)
    if (props.language === 'en') {
        langWord = 'English';
        langIcon = '/assets/images/icons/uk.svg';
        featureHeading = 'Convenience';
        roomsHeading = 'Rooms and Amenities';
        foodHeading = 'Food and Drink';
        accessHeading = 'Access to the Hotel';
        actHeading = 'Activities';
        galleryHeading = 'Gallery';
        contactHeading = 'Contact Us';
        bookHeading = 'BOOK NOW';
    } else if (props.language === 'jp') {
        langWord = '日本語';
        langIcon = '/assets/images/icons/japan.svg';
        featureHeading = '便利性';
        roomsHeading = '部屋とアメニティー';
        foodHeading = '食べ物と飲み物';
        actHeading = 'アクテビティ';
        accessHeading = 'ホテルへのアクセス';
        galleryHeading = 'ギャラリー';
        contactHeading = '問い合わせ';
        bookHeading = '予約';
    } else if (props.language === 'ch1') {
        langWord = '中文(简)';
        langIcon = '/assets/images/icons/japan.svg';
        featureHeading = '便利性';
        roomsHeading = '客房及附带服务';
        foodHeading = '食物和饮料';
        actHeading = '标准服务';
        accessHeading = '来酒店的交通方式';
        galleryHeading = '画廊';
        contactHeading = '询问';
        bookHeading = '订房';
    } else {
        langWord = '中文(繁)';
        langIcon = '/assets/images/icons/japan.svg';
        featureHeading = '便利性';
        roomsHeading = '客房及附帶服務';
        foodHeading = '食物和飲料';
        actHeading = '標準服務';
        accessHeading = '來酒店的交通方式';
        galleryHeading = '畫廊';
        contactHeading = '詢問';
        bookHeading = '訂房';
    }
    

    return (
        <div className={ topbarIsOpague ? 'header header-bg' : 'header'} > {/* top bar defined in .header */}
            <div className='col-3 col-sm-top1 col-md-top1 headerLeft'> {/* left 25% container for dropdown menu */}
                <div className='menuBars'>          {/* .menuBars bar1-3 define shape/color of dropdown button */}
                    <div className='bar1'></div>    {/* from w3c How to section */}
                    <div className='bar2'></div>
                    <div className='bar3'></div>
                    <div className="menuDropdown">  {/* From here the dropdown menu content */}
                        {/* <Link1 to="/#features">{featureHeading}</Link1>          Link1 allows jumping to anywhere marked by id */}
                        <Link1 to="rooms">{roomsHeading}</Link1>
                        <Link1 to="/#foods">{foodHeading}</Link1>
                        <Link1 to="/#activities">{actHeading}</Link1>
                        <Link1 to='access'>{accessHeading}</Link1>
                        <Link1 to='gallery'>{galleryHeading}</Link1>
                        <Link1 to="/#contactUs">{contactHeading}</Link1>

                        {/* <a href="#features">Convenience</a>
                        <a href="#rooms">Rooms and Amanities</a>
                        <a href="#foods">Food and Drink</a>
                        <a href="#activities">Actitivites</a>
                        <a href='#'>Gallery</a>
                        <a href="#contactUs">Contact Info</a> */}
                    </div>
                </div>
                <Outlet />
            </div>
            <div className='col-6 col-sm-top2 col-md-top2 headerCenter'>  {/* middle 50% container for hotel name */}
                {/* <h1 id='hotelName'>Hotel Sejour Mint</h1> */}
                <Link to='/' id='hotelName' className='hotelNameInHeader'>Hotel Sejour Mint</Link>
            </div>
            <div className='col-3 headerRight'>             {/* right 25% container for booking button for big screen */}
                <div id='langWord' className='langDropdownBox'>{langWord}
                    <div className='langDropdownItems'>
                        <div className='langDropdownItem' onClick={()=>props.changeLanguage('en')}>{'English'}</div>
                        <div className='langDropdownItem' onClick={()=>props.changeLanguage('jp')}>{'日本語'}</div>
                        <div className='langDropdownItem' onClick={()=>props.changeLanguage('ch1')}>{'中文(简)'}</div>
                        <div className='langDropdownItem' onClick={()=>props.changeLanguage('ch2')}>{'中文(繁)'}</div>
                    </div>
                </div>
                {/* <button type='button' onClick={props.changeLanguage} className='langButton'>
                    <img src={langIcon} alt={'language icon: ' + props.language} id='langIcon' />
                </button>  */}
                <Link to='booking' className='booking'>{bookHeading}</Link>
            </div> 
        </div>
    )
}

export default Header;