// ContactUs is the tail component as one navigates to the end of the page
import React from 'react';
import {SocialIcon} from 'react-social-icons';
import './Main.css'
import './ContactUs.css'

const ContactUs = (props) => {
    // The props passes the title words 
    const title = props.title;
    // console.log('Contact Us = ', title);
    const id = props.ids;

    // Prepare translation
    var addressTitle, address, phone, email, socMedia, forBooking;
    if (props.language === 'en') {
        addressTitle = 'Address:';
        address = '22201-68 Kamishiro, Hakuba Nagano, Japan';
        phone = 'Telephone:';
        email = 'Email:';
        socMedia = 'Social Media:';
        forBooking = 'For Booking:';
    } else if (props.language === 'jp') {
        addressTitle = '住所:';
        address = '日本国長野県白馬村神城　22201-68';
        phone = '電話:';
        email = 'メール:';
        socMedia = 'ソーシャル・メデア:';
        forBooking = '予約:';
    } else if (props.language === 'ch1') {
        addressTitle = '地址:';
        address = '日本国長野県白馬村神城　22201-68';
        phone = '电话:';
        email = '邮箱:';
        socMedia = '社交媒体:';
        forBooking = '订房:';
    } else if (props.language === 'ch2') {
        addressTitle = '地址:';
        address = '日本国長野県白馬村神城　22201-68';
        phone = '電話:';
        email = '郵箱:';
        socMedia = '社交媒體:';
        forBooking = '訂房:';
    } else {}

    return (
        <div id={id} className='contactUsBox' >
            {/* <hr className='lineColor'></hr> */}
            <h2 className='titleFrame'>{title}</h2>
            <div className='col-6 col-sm-half col-md-half contactUsFrame'>
                <table>
                    <thead>
                        <tr>
                            <th className='tableCol1'></th>
                            <th className='tableCol2'></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='tableCol1'>{addressTitle}</td>
                            <td className='tableCol2'>{address}</td>
                        </tr>
                        <tr>
                            <td className='tableCol1'>{phone}</td>
                            <td className='tableCol2'>(+81) 0261-753250</td>
                        </tr>
                        <tr>
                            <td className='tableCol1'>{email}</td>
                            <td className='tableCol2'>info@sejourmint.com</td>
                        </tr>
                        <tr>
                            <td className='tableCol1'>{socMedia}</td>
                            <td className='tableCol2'>
                                <SocialIcon className='icons' url='https://www.linkedin.com' />
                                <SocialIcon className='icons' url='https://www.facebook.com' />
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className='tableCol1'></td>
                            <td className='tableCol2'></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className='col-6 col-sm-half col-md-half contactUsFrame'>
                <table>
                    <thead>
                        <tr>
                            <th className='tableCol1'></th>
                            <th className='tableCol2'></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='tableCol1'>{forBooking}</td>
                            <td className='tableCol2'></td>
                        </tr>
                        <tr>
                            <td className='tableCol1'></td>
                            <td className='tableCol2'>(+81) 0261-753250</td>
                        </tr>
                        <tr>
                            <td className='tableCol1'></td>
                            <td className='tableCol2'>info@sejourmint.com</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className='tableCol1'></td>
                            <td className='tableCol2'></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default ContactUs;