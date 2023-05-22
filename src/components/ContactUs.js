// ContactUs is the tail component as one navigates to the end of the page
import React, { useEffect, useState } from 'react';
import {SocialIcon} from 'react-social-icons';
import './Main.css'
import './ContactUs.css'
import { json } from 'react-router-dom';

const ContactUs = (props) => {
    // The props passes the title words 
    const title = props.title;
    // console.log('Contact Us = ', title);
    const id = props.ids;

    // Prepare translation
    var addressTitle, address, phone, email, socMedia, forEnquiries, forEnquiries1;
    var emailInput, firstName, lastName, subjectCat, message, inputPreamble, submit, subjectDropdown = {
        booking: '',
        event: '',
        facility: '',
        service: '',
        activity: '',
        other: '',
    }, submittedMsg;
    const [selectedSubject, setSelectedSubject] = useState(subjectDropdown.booking);
    const [openSubjectSymbol, setOpenSubjectrSymbol] = useState('+');
    const toggleOpenSubject = () => {
        if (openSubjectSymbol === '+') {
            document.getElementById('subjectDropdownList').style.display = 'block';
            setOpenSubjectrSymbol('-');
        }
        else {
            document.getElementById('subjectDropdownList').style.display = 'none';
            setOpenSubjectrSymbol('+');
        }
    }

    // initialize selectedSubject var upon each rendering
    useEffect(()=> {
        setSelectedSubject(subjectDropdown.booking);
        document.getElementById('submittedMsgBox').style.display = 'none';

    }, [props.language]);

    if (props.language === 'en') {
        addressTitle = 'Address:';
        address = '22201-68 Kamishiro, Hakuba Nagano, Japan (Click to Open/Close Map)';
        phone = 'Telephone:';
        email = 'Email:';
        socMedia = 'Social Media:';
        forEnquiries = 'For Enquiries:';
        forEnquiries1 = 'Click to Open Enquiry Form';
        emailInput = 'Email *';
        firstName = 'First Name *';
        lastName = 'Last Name *';
        subjectCat = 'Subject Category *';
        message = 'Message *';
        inputPreamble = 'Please let us know what you have in mind, and we will get back to you shortly';
        submit = 'Submit Input';
        subjectDropdown = {
            booking: 'Booking',
            event: 'Event & Block Reservation',
            facility: 'Facility',
            service: 'Service',
            activity: 'Activities',
            other: 'Other',
        };
        submittedMsg = 'Your enquiry has been successfully submitted. We will get back to you shortly.'
    } else if (props.language === 'jp') {
        addressTitle = '住所:';
        address = '日本国長野県白馬村神城　22201-68 （クリックで、地図を開けられる）';
        phone = '電話:';
        email = 'メール:';
        socMedia = 'ソーシャル・メデア:';
        forEnquiries = '問い合わせ:';
        forEnquiries1 = 'クリックで、問合せフォームを開ける';
        emailInput = 'メール *';
        firstName = '名前';
        lastName = '姓';
        subjectCat = '題目カテゴリー';
        message = 'メッセージ';
        inputPreamble = 'ご意見やご希望がありましたら、お知らせください。折り返し返信いたします。';
        submit = '入力を送信する';
        subjectDropdown = {
            booking: '予約',
            event: 'イベントとグループ予約',
            facility: '設備',
            service: 'サービス',
            activity: '活動',
            other: 'その他',
        };
        submittedMsg = 'お問い合わせは送信されました。近日中にご連絡いたします。'
    } else if (props.language === 'ch1') {
        addressTitle = '地址:';
        address = '日本国長野県白馬村神城　22201-68 （点击看地图）';
        phone = '电话:';
        email = '邮箱:';
        socMedia = '社交媒体:';
        forEnquiries = '询问:';
        forEnquiries1 = '点击打开询问表';
        emailInput = '电子邮箱 *';
        firstName = '名';
        lastName = '姓';
        subjectCat = '题目种类';
        message = '留言';
        inputPreamble = '请告诉我们你心中所想，我们会尽快回复你。';
        submit = '提交输入';
        subjectDropdown = {
            booking: '订房',
            event: '聚会及团体订房',
            facility: '设备',
            service: '服务',
            activity: '活动',
            other: '其他',
        };
        submittedMsg = '你的查询已成功提交。我们将尽快与你联系。'

    } else if (props.language === 'ch2') {
        addressTitle = '地址:';
        address = '日本国長野県白馬村神城　22201-68 （點擊看地圖）';
        phone = '電話:';
        email = '郵箱:';
        socMedia = '社交媒體:';
        forEnquiries = '詢問:';
        forEnquiries1 = '點擊打開詢問表';
        emailInput = '電子郵箱 *';
        firstName = '名';
        lastName = '姓';
        subjectCat = '題目種類';
        message = '留言';
        inputPreamble = '請告訴我們你心中所想，我們將盡快回覆你。';
        submit = '提交輸入';
        subjectDropdown = {
            booking: '訂房',
            event: '聚會及團體訂房',
            facility: '設備',
            service: '服務',
            activity: '活動',
            other: '其他',
        };
        submittedMsg = '你的查詢已成功提交。我們將盡快與你聯繫。'

    } else {}

    // The following state toggles map openning and closing
    const [mapIsVisible, setMapIsVisible] = useState(false);

    const toggleMapVisibility = () => {
        setMapIsVisible(!mapIsVisible);
    }

    // The following state toggles enquiry form openning and closing
    const [formIsOpen, setFormIsOpen] = useState(false);
    const toggleEnquiry = () => {
        setFormIsOpen(!formIsOpen);
        if (formIsOpen) {
            document.getElementById('submittedMsgBox').style.display = 'none';
        }
    }

    const [enquiry, setEnquiry] = useState({ // Holder of enquiry input
        //id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subjectCat: '', // subject category
        message: '',
    });
    const [inputIsValid, setInputIsValid] = useState({
        //id: 0,
        firstName: false,
        lastName: false,
        email: false,
        message: false ,
    });

    const handleFN = (e) => {
        const { value } = e.target;
        setEnquiry(prev=>({...prev, firstName: value}))
        if (value !== '') {
            setInputIsValid(prev=>({...prev, firstName: true}));
            // The line below is in case after submitting msg, the user starts again without closing the form, then the succesasful submission is withdrawn
            // this line appears in every input field below. 
            document.getElementById('submittedMsgBox').style.display = 'none';
        } else {
            setInputIsValid(prev=>({...prev, firstName: false}));
        }    
    }
    const handleLN = (e) => {
        const { value } = e.target;
        setEnquiry(prev=>({...prev, lastName: value}))
        if (value !== '') {
            setInputIsValid(prev=>({...prev, lastName: true}));
            document.getElementById('submittedMsgBox').style.display = 'none';
        } else {
            setInputIsValid(prev=>({...prev, lastName: false}));
        }    
    }
    const handleEmail = (e) => {
        const { value } = e.target;
        setEnquiry(prev=>({...prev, email: value}))
        if (value !== '') {
            setInputIsValid(prev=>({...prev, email: true}));
            document.getElementById('submittedMsgBox').style.display = 'none';
        } else {
            setInputIsValid(prev=>({...prev, email: false}));
        }    
    }
    const handlePhone = (e) => {
        const { value } = e.target;
        setEnquiry(prev=>({...prev, phone: value}))
    }

    const handleSubjectCat = (e) => { // update to reflect selection and rerender
        setSelectedSubject(e);
        setEnquiry(prev=>({...prev, subjectCat: e}))
        document.getElementById('subjectDropdownList').style.display = 'none';
        setOpenSubjectrSymbol('+');
        document.getElementById('submittedMsgBox').style.display = 'none';

    }

    const handleMessage = (e) => {
        const { value } = e.target;
        setEnquiry(prev=>({...prev, message: value}))
        if (value !== '') {
            setInputIsValid(prev=>({...prev, message: true}));
            document.getElementById('submittedMsgBox').style.display = 'none';
        } else {
            setInputIsValid(prev=>({...prev, message: false}));
        }    
    }

    async function submitInput() {
        var emailIsSent = false;
        const inputOK = inputIsValid.firstName*inputIsValid.lastName*inputIsValid.email*inputIsValid.message;
        
        // BEGIN function to submit enquiry to server
        async function submitEnquiry() {
            // console.log('ENQUIRY before submission = ', enquiry);
            try {
            const response = await fetch('http://localhost:3001/submitEnquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(enquiry),
            });
            const jsonData = await response.json();
            emailIsSent = true;

            console.log('RESPOSE FROM SUBMIT ENQUIRY = ', jsonData, emailIsSent);
            // return jsonData;
            } catch (error) {
                console.error(error);
            }
        }
        // END


        if(inputOK) {
            // submit query to server and then close enquiry and thank you message
            await submitEnquiry();
            // submitEnquiry();
            // if (response.status === 'Email sent successfully') {
                // console.log('EMAIL SENT = ', emailIsSent);
            if (emailIsSent) {
                document.getElementById('submittedMsgBox').style.display = 'block';
            }
            // }
            // document.getElementsByClassName('enquiryForm')[0].style.display = 'none';


        } else { // Require user to input missing field by making it red border
            if (!inputIsValid.firstName) {
                document.getElementById('fn').style.borderColor = 'red';
            }
            if (!inputIsValid.lastName) {
                document.getElementById('ln').style.borderColor = 'red';
            }
            if (!inputIsValid.email) {
                document.getElementById('email').style.borderColor = 'red';
            }
            if (!inputIsValid.message) {
                document.getElementById('message').style.borderColor = 'red';
            }
        }
    }

    const handlePhoneClick = () => {
        const phoneNumber = '+81261753250'; // Replace with your actual phone number
        window.open(`tel:${phoneNumber}`);
      };

    return (
        <div id={id} className='contactUsBox' >
            {/* <hr className='lineColor'></hr> */}
            <h2 className='titleFrame'>{title}</h2>
            {/* <div className='col-6 col-sm-half col-md-half contactUsFrame'> */}
            <div className='contactUsFrame'>
                <table className='tableContainer'>
                    <thead>
                        <tr>
                            <th className='tableCol1'></th>
                            <th className='tableCol2'></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='tableCol1'>{addressTitle}</td>
                            <td className='tableCol2' onClick={toggleMapVisibility}>{address}</td>
                        </tr>
                        <tr>
                            <td className='tableCol1'></td>
                            <td className='tableCol2'>
                                {/* <iframe id='map' className='mapFrame'  */}
                                <iframe id='map' className={`mapFrame ${mapIsVisible ? 'open' : ''}`} 
                                //   style={{display: mapIsVisible? 'block' : 'none'}}
                                //   width="450"
                                  height="400"
                                  frameBorder="0"
                                  title='Hotel Sejour Mint on googlemap'
                                  referrerPolicy="no-referrer-when-downgrade"
                                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBDwxkjaPXl4bWNKPOoQAZ_OGzWVsWUEGk&q=22201-68+Kamishiro,+Hakuba,+Nagano,+Japan"
                                  allowFullScreen>
                                </iframe>
                            </td>
                        </tr>
                        <tr>
                            <td className='tableCol1'>{phone}</td>
                            <td className='tableCol2'>
                                <a href='#' onClick={handlePhoneClick}>(+81) 0261-753250</a>
                            </td>
                        </tr>
                        <tr>
                            <td className='tableCol1'>{email}</td>
                            <td className='tableCol2'>
                                <a href="mailto:info@sejourmint.com?subject='Enquiry from Sejour Mint Website'">info@sejourmint.com</a></td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td className='tableCol1'>{forEnquiries}</td>
                            <td className='tableCol2' onClick={toggleEnquiry}>{forEnquiries1}</td>
                        </tr>
                        <tr>
                            <td className='tableCol1'></td>
                            <td className='tableCol2'>
                                <div className={`enquiryForm ${formIsOpen ? 'open' : ''}`}>
                                    <p className='formRowTitle'>{inputPreamble}</p>
                                    <div className='formRow2Cols'>
                                        <div className='formCol1'>
                                            <p className='formRowTitle'>{firstName}</p>
                                            <input id='fn' value={enquiry.firstName} 
                                                type='text' onChange={handleFN}
                                                className='inputBox' />
                                        </div>
                                        <div className='formCol2'>
                                            <p className='formRowTitle'>{lastName}</p>
                                            <input id='ln' value={enquiry.lastName} 
                                                type='text' onChange={handleLN}
                                                className='inputBox' />
                                        </div>
                                    </div>
                                    <div className='formRow2Cols'>
                                        <div className='formCol1'>
                                            <p className='formRowTitle'>{emailInput}</p>
                                            <input id='email' value={enquiry.email} 
                                                type='text' onChange={handleEmail}
                                                className='inputBox' />
                                        </div>
                                        <div className='formCol2'>
                                            <p className='formRowTitle'>{phone}</p>
                                            <input id='phone' value={enquiry.phone} 
                                                type='text' onChange={handlePhone}
                                                className='inputBox' />
                                        </div>
                                    </div>
                                    <div className='formRow'>
                                        <p className='formRowTitle'>{subjectCat}</p>
                                        {/* <input id='fn' value={enquiry.subjectCat} 
                                            type='text' onChange={handleSubjectCat}
                                            className='inputBox' /> */}
                                        <div className='subjectDropdownBox'>
                                            <div className='subjectBoxLeft'>{selectedSubject}</div>
                                            <div className='subjectBoxRight' onClick={toggleOpenSubject}>{openSubjectSymbol}</div>
                                        </div>
                                        <div id='subjectDropdownList' className='subjectDropdownList'>
                                            <div className='subjectItem' onClick={()=>handleSubjectCat(subjectDropdown.booking)}>{subjectDropdown.booking}</div>
                                            <div className='subjectItem' onClick={()=>handleSubjectCat(subjectDropdown.event)}>{subjectDropdown.event}</div>
                                            <div className='subjectItem' onClick={()=>handleSubjectCat(subjectDropdown.facility)}>{subjectDropdown.facility}</div>
                                            <div className='subjectItem' onClick={()=>handleSubjectCat(subjectDropdown.service)}>{subjectDropdown.service}</div>
                                            <div className='subjectItem' onClick={()=>handleSubjectCat(subjectDropdown.activity)}>{subjectDropdown.activity}</div>
                                            <div className='subjectItem' onClick={()=>handleSubjectCat(subjectDropdown.other)}>{subjectDropdown.other}</div>
                                        </div>
                                    </div>
                                    <div className='formRow'>
                                        <p className='formRowTitle'>{message}</p>
                                        <textarea id='message' value={enquiry.message} 
                                            onChange={handleMessage}></textarea>
                                    </div>
                                    <div className='submitContainer'>
                                        <div className='submitButton' onClick={submitInput}>
                                            {submit}
                                        </div>
                                    </div>
                                </div>
                                <div id='submittedMsgBox'>
                                    {submittedMsg}
                                </div>
                            </td>
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
            {/* <div className='col-6 col-sm-half col-md-half contactUsFrame'>
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
            </div> */}
        </div>
    )
}

export default ContactUs;