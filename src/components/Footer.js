import React, { useState } from 'react'
import { FcUp } from "react-icons/fc";
import { HashLink as Link1 } from 'react-router-hash-link';

import './Main.css'
import './Footer.css'
import { Outlet } from 'react-router-dom';

const Footer = (props) => {
    // BEGIN - This block of code changes the opacity of the bottom block indicator 
    // in the lower right upon scrolling
    const [bottomBarColor, setBottomBarColor] = useState(false);
    // if ( window.innerWidth <= 768 ) { // for small screen, set to true
    //     setBottomBarColor(true);
    // } 
    const changeBottomBarColor = () => {
        if ( window.innerWidth <= 768 ) { // for small screen, set to true
            setBottomBarColor(true);
        } else { // below block only for big screen
            if (window.scrollY >= 1500 ) {
                setBottomBarColor(true);
                document.getElementById('fcUp').style.opacity = 1.0;
            } else {
                setBottomBarColor(false);
                document.getElementById('fcUp').style.opacity = 0.0;
            }
        }
    }

    window.addEventListener('scroll', changeBottomBarColor);
    // END
    // console.log('window width = ', window.innerWidth);

    // set language icon based on the language state from props.language
    var langIcon = '', langWord = '', booking, gallery;
    // console.log('language seen in header = ', props.language)
    if (props.language === 'en') {
        langWord = 'English';
        langIcon = '/assets/images/icons/uk.svg';
        booking = 'Booking';
        gallery = 'Gallery';
    } else if (props.language === 'jp') {
        langWord = '日本語';
        langIcon = '/assets/images/icons/japan.svg';
        booking = 'ご予約';
        gallery = 'ガラりー';
    } else if (props.language === 'ch1') {
        langWord = '中文(简)';
        langIcon = '/assets/images/icons/japan.svg';
        booking = '订房';
        gallery = '画廊';
    } else if (props.language === 'ch2') {
        langWord = '中文(繁)';
        langIcon = '/assets/images/icons/japan.svg';
        booking = '訂房';
        gallery = '畫廊';
    } else {}
    
    // const removeArrow = () => {
    //     document.getElementById('fcUp').style.opacity = 0.0;
    // }

    return (

        <div className={ bottomBarColor ? 'footer footer-bg' : 'footer'} >
                {/* <a href='/' className='col-sm-bottom1 col-md-bottom1 bottomSmallScreen1'><span id='bottomSmScreenBox1'>B1<span/></span></a> */}
                <div className='bottomBigScreen'>
                <a href='/' className='bottomBigScreen'><FcUp id='fcUp'/></a>
                </div>

            {/* </div>  */}
            <div className='botthomMenuBar'>
                <div id='langWord' className='bottomSmallScreen1'>{langWord}
                    <div className='langDropdownItemsFooter'>
                        <div className='langDropdownItemFooter' onClick={()=>props.changeLanguage('en')}>{'English'}</div>
                        <div className='langDropdownItemFooter' onClick={()=>props.changeLanguage('jp')}>{'日本語'}</div>
                        <div className='langDropdownItemFooter' onClick={()=>props.changeLanguage('ch1')}>{'中文(简)'}</div>
                        <div className='langDropdownItemFooter' onClick={()=>props.changeLanguage('ch2')}>{'中文(繁)'}</div>
                    </div>
                    {/* <button type='button' onClick={props.changeLanguage} className='langButton'>
                        <img src={langIcon} alt={'language icon: ' + props.language} id='langIcon' />
                    </button>  */}
                </div>
                <Link1 to='gallery' className='bottomSmallScreen2'>{gallery}</Link1>
                <Link1 to='booking' className='bookingBottom'>{booking}</Link1>
                {/* <a href='/gallery' className='bottomSmallScreen2'>{gallery}</a>
                <a className='bookingBottom' href='/booking' >{booking}</a> */}
            </div>
            <Outlet />

        </div>

    )
}

export default Footer;
