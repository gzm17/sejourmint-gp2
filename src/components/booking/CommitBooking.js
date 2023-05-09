import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import { IoArrowForward, IoAdd, IoRemove, IoAddCircleOutline, IoBarChartOutline, IoCheckmark, IoChevronDownOutline, IoChevronUpOutline, IoCheckmarkOutline} from "react-icons/io5";

// The following imports the components for presentation
import './CommitBooking.css';

function CommitBooking(props) {

    const bookedRooms = props.bookedRooms;
    let totalCostPreTax = 0, totalCostPostTax = 0;
    let taxTotal = 0;

    // The following states are used to get from the users and validate inputs
    const [guestInfo, setGuestInfo] = useState({
        //id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '', // ISO-3166-alpha2 two letter code
        instruction: '',
    });
    const [bookerInfo, setBookerInfo] = useState({
        //id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '', // ISO-3166-alpha2 two letter code
        instruction: '',
    });

    const [bookerIsGuest, setBookerIsGuest] = useState(true);
    const [guestInfoValidated, setGuestInfoValidated] = useState({
        lastName: false,
        email: false,
        phone: false,
    });
    const [bookerInfoValidated, setBookerInfoValidated] = useState({
        lastName: false,
        email: false,
        phone: false,
    });

    // Used to indicate fetch submitted booker/guest info and got back their ids
    // This info is then used in useEffect to further insert record for res_parent and reservation
    const [guestIds, setGuestIds] = useState({
        bookerId: 0,
        guestId: 0,
    }); 

    // This is the id of the res_parent record insertion, which is used to insert reservations
    // The id is obtained from fetch in updateResParent() in useEffect
    const [resParentId, setResParentId] = useState(0);

    // The state var paymentIsSuccessful is from credit card companies after validating
    // This is defaulted to false. Only when the var is true, updateResParent and updateReservation 
    // are executed (posting reservation info to DB)
    const [paymentIsSuccessful, setPaymentIsSuccessful] = useState(false);

    // Below block of code handles the input and validation, validation is 
    // only for must fields.
    // Note that value-setting for infoValidation is done at the same time. 
    // Otherwise, there is a cycle gap between when value is changed and validation set. The current
    // method the two are in sync (as far as humans are concerned)
    const handleBookerFN = (e) => {
        const { value } = e.target;
        // console.log('INPUT name value ', value);
        setBookerInfo(prev=>({...prev, firstName: value}))
        // validateInput();
    }
    const handleBookerLN = (e) => {
        const { value } = e.target;
        setBookerInfo(prev=>({...prev, lastName: value}))
        if (value !== '') {
            setBookerInfoValidated(prev=>({...prev, lastName: true}));
        } else {
            setBookerInfoValidated(prev=>({...prev, lastName: false}));
        }
    }
    const handleBookerEmail = (e) => {
        const { value } = e.target;
        setBookerInfo(prev=>({...prev, email: value}))
        if (value !== '' && value.includes('@')) {
            setBookerInfoValidated(prev=>({...prev, email: true}));
        } else {
            setBookerInfoValidated(prev=>({...prev, email: false}));
        }    }
    const handleBookerPhone = (e) => {
        const { value } = e.target;
        setBookerInfo(prev=>({...prev, phone: value}))
        if (value !== '') {
            setBookerInfoValidated(prev=>({...prev, phone: true}));
        } else {
            setBookerInfoValidated(prev=>({...prev, phone: false}));
        }    
    }

    const handleBookerCountry = (e) => {
        const { value } = e.target;
        setBookerInfo(prev=>({...prev, country: value}))
        // validateInput();
    }
    const handleBookerInstruction = (e) => {
        const { value } = e.target;
        setBookerInfo(prev=>({...prev, instruction: value}))
        // validateInput();
    }

    // handles Guest info input
    const handleGuestFN = (e) => {
        const { value } = e.target;
        // console.log('INPUT name value ', value);
        setGuestInfo(prev=>({...prev, firstName: value}))
        // validateInput();
    }
    const handleGuestLN = (e) => {
        const { value } = e.target;
        setGuestInfo(prev=>({...prev, lastName: value}))
        if (value !== '') {
            setGuestInfoValidated(prev=>({...prev, lastName: true}));
        } else {
            setGuestInfoValidated(prev=>({...prev, lastName: false}));
        }    
    }
    const handleGuestEmail = (e) => {
        const { value } = e.target;
        setGuestInfo(prev=>({...prev, email: value}))
        if (value !== '' && value.includes('@')) {
            setGuestInfoValidated(prev=>({...prev, email: true}));
        } else {
            setGuestInfoValidated(prev=>({...prev, email: false}));
        }    
    }
    const handleGuestPhone = (e) => {
        const { value } = e.target;
        setGuestInfo(prev=>({...prev, phone: value}))
        if (value !== '') {
            setGuestInfoValidated(prev=>({...prev, phone: true}));
        } else {
            setGuestInfoValidated(prev=>({...prev, phone: false}));
        }  
    }
    const handleGuestCountry = (e) => {
        const { value } = e.target;
        setGuestInfo(prev=>({...prev, country: value}))
        // validateInput();
    }
    const handleGuestInstruction = (e) => {
        const { value } = e.target;
        setGuestInfo(prev=>({...prev, instruction: value}))
        // validateInput();
    }

    // Input validation - this function only highlights if a field is complete or not (mark red)
    const validateInput = () => {
        // validate booker input: which is needed regardless of T/F of bookerIsGuest
        // if (bookerInfo.firstName.trim() === '') {
        //     setBookerInfoValidated(false);
        //     document.getElementById('bookerFN').style.borderColor = 'red';
        // } 
        if (bookerInfo.lastName.trim() !== '') {
            // setBookerInfoValidated(prev=>({...prev, lastName: true}));
            document.getElementById('bookerLN').style.borderColor = 'black';
        } else {
            // setBookerInfoValidated(prev=>({...prev, lastName: false}));
            document.getElementById('bookerLN').style.borderColor = 'red';
        }
        if (bookerInfo.email.trim() !== '' && bookerInfo.email.includes('@')) {
            // setBookerInfoValidated(prev=>({...prev, email: true}));
            document.getElementById('bookerEmail').style.borderColor = 'black';
        } else {
            // setBookerInfoValidated(prev=>({...prev, email: false}));
            document.getElementById('bookerEmail').style.borderColor = 'red';
        }
        if (bookerInfo.phone.trim() !== '') {
            // setBookerInfoValidated(prev=>({...prev, phone: true}));
            document.getElementById('bookerPhone').style.borderColor = 'black';
        } else {
            // setBookerInfoValidated(prev=>({...prev, phone: false}));
            document.getElementById('bookerPhone').style.borderColor = 'red';
        }

        // The following is moved to function copyBookerInfoToGuest
        // const bookerInfoOK = bookerInfoValidated.lastName && bookerInfoValidated.email && bookerInfoValidated.phone;
        // console.log('IN VALI bookerInfoOK = ', bookerInfoOK, bookerInfo, bookerInfoValidated);
        // if (bookerIsGuest && bookerInfoOK) { // If booker is guest (bookerIsGuest is T) pass booker info to guest
        //     setGuestInfo(bookerInfo);
        //     setGuestInfoValidated(bookerInfoValidated);
        //     console.log('pass booker --> guest ')
        // }

        // validate guest input: Below is needed only if bookerIsGuest is false
        if(!bookerIsGuest) {
            // if (guestInfo.firstName.trim() === '') {
            //     setBookerInfoValidated(false);
            //     document.getElementById('guestFN').style.borderColor = 'red';
            // } 
            if (guestInfo.lastName.trim() !== '') {
                // setGuestInfoValidated(prev=>({...prev, lastName: true}));
                document.getElementById('guestLN').style.borderColor = 'black';
            } else {
                // setGuestInfoValidated(prev=>({...prev, lastName: false}));
                document.getElementById('guestLN').style.borderColor = 'red';
            }
            if (guestInfo.email.trim() !== '' || guestInfo.email.includes('@')) {
                // setGuestInfoValidated(prev=>({...prev, email: true}));
                document.getElementById('guestEmail').style.borderColor = 'black';
            } else {
                // setGuestInfoValidated(prev=>({...prev, email: false}));
                document.getElementById('guestEmail').style.borderColor = 'red';
            }
            if (guestInfo.phone.trim() !== '') {
                // setGuestInfoValidated(prev=>({...prev, phone: true}));
                document.getElementById('guestPhone').style.borderColor = 'black';
            } else {
                // setGuestInfoValidated(prev=>({...prev, phone: false}));
                document.getElementById('guestPhone').style.borderColor = 'red';
            }
        }

      };

    var title, bookerSelf, bookerOther, bookerDetail, guestDetail, payment, checkBox1Text, firstName, lastName, email, emailText, phoneNum, nationality, instruction, paymentLogoTxt, cardNum, expDate, cvv, nameOnCard, totalCost, totalTax, totalCostWTax, commit, discountName;
    if (props.language === 'en') {
        title = 'Contact and Payment Details';
        bookerSelf = 'I am booking for myself';
        bookerOther = 'I am booking for someone else';
        bookerDetail = 'Your details';
        guestDetail = 'Guest details';
        payment = 'Payment';
        checkBox1Text = 'CheckBox1 text';
        firstName = 'First name';
        lastName = 'Last name *';
        email = 'Email *';
        emailText = 'We will send a confirmation email to this address';
        phoneNum = 'Phone *';
        nationality = 'Nationality';
        instruction = 'Special Requests';
        paymentLogoTxt = 'Secured by ZENTOMI LLC ';
        cardNum = 'Card number *';
        expDate = 'Expiration date (MM/YY) *';
        cvv = 'CVV *';
        nameOnCard = 'Name on the card *';
        totalCost = 'Total Cost';
        totalTax = 'Total Tax @ 10%';
        totalCostWTax = 'Total Cost Including Tax';
        commit = 'Confirm Booking Info and Pay';
        discountName = 'Discount';
    } else if (props.language === 'jp') {
        title = 'お客様情報と支払い情報';
        bookerSelf = '自分で予約している';
        bookerOther = '他人のために予約している';
        bookerDetail = 'ご予約者の詳細';
        guestDetail = 'ご宿泊者の詳細';
        payment = '支払い方法';
        checkBox1Text = 'CheckBox1 text';
        firstName = '名（カナ）';
        lastName = '姓（カナ） *';
        email = 'メールアドレス *';
        emailText = 'このメーリアドレスに確認メールを送ります';
        phoneNum = 'お電話番号 *';
        nationality = '国籍';
        instruction = 'その他、お問い合わせ';
        paymentLogoTxt = 'Secured by ZENTOMI LLC ';
        cardNum = '支払いカード番号 *';
        expDate = '有効期限（MM / YY） *';
        cvv = 'CVVセキュリティコード *';
        nameOnCard = 'カード名義 *';
        totalCost = '総額';
        totalTax = '税金';
        totalCostWTax = '総額（税込）';
        commit = '予約情報を確認して、支払う';
        discountName = '割引';
    } else if (props.language === 'ch1') {
        title = '客户及支付信息';
        bookerSelf = '为自己订房';
        bookerOther = '为他人订房';
        bookerDetail = '订房人信息';
        guestDetail = '住客信息';
        payment = '支付方式';
        checkBox1Text = 'CheckBox1 text';
        firstName = '名字';
        lastName = '姓 *';
        email = '邮箱 *';
        emailText = '确认邮件将送到此邮箱';
        phoneNum = '电话号码 *';
        nationality = '国籍';
        instruction = '其它及询问';
        paymentLogoTxt = 'Secured by ZENTOMI LLC ';
        cardNum = '信用卡号 *';
        expDate = '有效期限 MM / YY） *';
        cvv = 'CVV安全码 *';
        nameOnCard = '信用卡姓名 *';
        totalCost = '总额';
        totalTax = '税金';
        totalCostWTax = '总额（包税）';
        commit = '确认订房信息/支付';
        discountName = '折扣';
    } else if (props.language === 'ch2') {
        title = '客戶及支付信息';
        bookerSelf = '為自己訂房';
        bookerOther = '為他人訂房';
        bookerDetail = '訂房人信息';
        guestDetail = '住客信息';
        payment = '支付方式';
        checkBox1Text = 'CheckBox1 text';
        firstName = '名字 ';
        lastName = '姓 *';
        email = '郵箱 *';
        emailText = '確認郵件將送到此郵箱';
        phoneNum = '電話號碼 *';
        nationality = '國籍';
        instruction = '其他及詢問';
        paymentLogoTxt = 'Secured by ZENTOMI LLC ';
        cardNum = '信用卡號 *';
        expDate = '有效期限（MM / YY） *';
        cvv = 'CVV安全碼 *';
        nameOnCard = '信用卡姓名 *';
        totalCost = '總額';
        totalTax = '稅金';
        totalCostWTax = '総額（包稅）';
        commit = '確認訂房信息/支付';
        discountName = '折扣';
    } else {};

    function handleBookerClick(booker){
        const selfBox = document.getElementsByClassName('bookingForSelf')[0];
        const otherBox = document.getElementsByClassName('bookingForOther')[0];
        const checkMarkSelf = document.getElementsByClassName('checkMarkSelf')[0];
        const checkMarkOther = document.getElementsByClassName('checkMarkOther')[0];
        if(booker === 'self') {
            setBookerIsGuest(true);
            checkMarkSelf.style.opacity = 1.0;
            selfBox.style.borderColor = 'rgba(235, 172, 55, 0.809)';
            selfBox.style.zIndex = 1;
            otherBox.style.zIndex = 0;
            checkMarkOther.style.opacity = 0.0;
            otherBox.style.borderColor = 'rgb(190, 185, 185)';
            document.getElementById('guestContainer').style.display = 'none';
            document.getElementById('bookerContainer').style.display = 'block';
        } else {
            setBookerIsGuest(false);
            checkMarkSelf.style.opacity = 0.0;
            selfBox.style.borderColor = 'rgb(190, 185, 185)';
            selfBox.style.zIndex = 0;
            otherBox.style.zIndex = 1;
            checkMarkOther.style.opacity = 1.0;
            otherBox.style.borderColor = 'rgba(235, 172, 55, 0.809)';
            document.getElementById('bookerContainer').style.display = 'none';
            document.getElementById('guestContainer').style.display = 'block';
        }
    }

    // Make the final financial summary part 
    const financialDetails = bookedRooms.map((room, index) => {
        totalCostPreTax += room.price;
        const typeName = (props.language === 'en' ? room.typeName : room.typeNameJ );
        const rateName = (props.language === 'en' ? room.rateName : room.rateNameJ );
        return (
            <div key={index} className='roomPriceContainer'>
                <p style={{fontSize: 15}} className='typeRateName'>{typeName + ' + ' + rateName}</p>
                <p style={{fontSize: 15}} className='ratePrice'>{'¥' + room.price.toLocaleString()}</p>
                <hr/>
            </div>
        )
    })

    const discountRate = props.bookedRooms[0].discount;
    const discount = discountRate*totalCostPreTax;
    totalCostPreTax = totalCostPreTax - discount;
    taxTotal = 0.1*(totalCostPreTax);
    totalCostPostTax = totalCostPreTax + taxTotal;
    // console.log('DISCOUNT RATE ', props.bookedRooms[0].discount);

    // the following snipet is for displaying discount
    const discountDisplay = 
    <div className='roomPriceContainer'>
        <p className='typeRateName' style={{fontSize: 15}}>{discountName}</p>
        <p className='ratePrice' style={{fontSize: 15}}>{'JPY ' + discount.toLocaleString()}</p>
    </div>

    // Handle commit i.e., payment. Here is a placeholder that only submits the booking info to DB
    // What is remaining also call Payment APIs to submit payment
    
    // updateBookingToDB is called by handleCommitInput: this updates the db
    const updateBookingToDB = async () => {
        console.log('DB UPDATING ...');
        var idInfo;
        // First update the booker/guest info to db
        try {
            // const response = await fetch('http://localhost:3001/availableRooms?${searchParams}', {
            const response = await fetch('http://localhost:3001/insertGuests', {
                method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({booker: bookerInfo, guest: guestInfo, bookerIsGuest: bookerIsGuest}),
            });
            idInfo = await response.json();
            setGuestIds({bookerId: idInfo.bookerId, guestId: idInfo.guestId});
            // setGuestInfo(prev => ({...prev, id: idInfo.guestId}))
            console.log('ID INFO 1 = ', idInfo);
            // set(jsonData);
        } catch (error) {
            console.error(error);
        } 
        console.log('ID INFO 2 = ', idInfo, bookerInfo.id, guestInfo.id);
    }

    const handleCommitInput = () => {
        const bookerInfoOK = bookerInfoValidated.lastName && bookerInfoValidated.email && bookerInfoValidated.phone;
        const guestInfoOK = guestInfoValidated.lastName && guestInfoValidated.email &&guestInfoValidated.phone;

        // console.log('BEFORE VALI bookerV = ', bookerInfoOK, bookerInfo);

        // validate inputs: validate first, then check since validation vars are init to be true
        validateInput();
        // console.log('AFTER VALI bookerV = ', bookerInfoOK, bookerInfo);

        // Check validation results
        if(bookerIsGuest) {
            if (bookerInfoOK) {
                updateBookingToDB();
            } else {
                alert('Booker info is not complete. Check Again.')
            }

        } else {
            if (guestInfoOK && bookerInfoOK) {
                updateBookingToDB();
            } else {
                alert('Guest or booker info is not complete. Check Again.')
            }
        }
    }

    // useEffect below is to ensure execution of validateInput when one of the things change. 
    // Not clear why validateInput needs to be there (recommended by vcode)
    // Without this: updateDB executes before validateInput (cp bookerInfo to guestInfo)
    // useEffect(() => {
    //     validateInput();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [bookerInfo, guestInfo])

    // The following is to copy booker info to guest info when booker === guest.
    function copyBookerInfoToGuest() {
        const bookerInfoOK = bookerInfoValidated.lastName && bookerInfoValidated.email && bookerInfoValidated.phone;
        console.log('IN copyBookerInfoToGuest bookerInfoOK = ', bookerInfoOK, bookerInfo, bookerInfoValidated);
        if (bookerIsGuest && bookerInfoOK) { // If booker is guest (bookerIsGuest is T) pass booker info to guest
            setGuestInfo(bookerInfo);
            setGuestInfoValidated(bookerInfoValidated);
            console.log('pass booker --> guest ')
        }
    }

    useEffect(() => {
        if (bookerIsGuest) {
            copyBookerInfoToGuest();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookerInfoValidated])

    // the following useEffect updates bookedRooms with guestId
    // This code can be refactored by eliminating guestIds. But later
    useEffect(() => {
        let copyBookedRooms = [...props.bookedRooms];
        for (let i = 0; i < copyBookedRooms.length; i++) {
            copyBookedRooms[i].guestId = guestIds.guestId;
        }
        console.log('COMMMIT bookedRooms copy = ', copyBookedRooms);
        props.refreshBookedRooms(copyBookedRooms);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guestIds])

    // the following useEffect submits res_parent with registered booker/guestIds
    // bookerId and guestID are from updateBookingToDB as output after registering guest info
    useEffect(()=> {
        // then upload the master info (who booked the reservation) info to DB res_parent table
        async function updateResParent() {
            try {
                console.log('ID INFO 3/res_parent ENTER = ');
                const response = await fetch('http://localhost:3001/insertResParent', {
                    method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({bookerId: guestIds.bookerId, guestId: guestIds.guestId, tsCreated: new Date(), bookerIsGuest: bookerIsGuest, channelId: 3, totalPrice: totalCostPreTax, discountId: props.bookedRooms[0].discountId, reservationStatus: 1}),
                });
                const jsonData = await response.json();
                setResParentId(jsonData.resParentId);
                console.log('ID INFO 3/res_parent LEFT = ', jsonData);
            } catch (error) {
                console.error(error);
            }
        }

        if (guestIds.guestId !== 0) updateResParent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guestIds]);

    // updateResParent() above then triggers update of reservation using the resParentId
    useEffect(() => {

        // define the function
        async function insertReservation() {
            try {
                console.log('insertReservation ENTER = ');
                const response = await fetch('http://localhost:3001/insertReservation', {
                    method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({resParentId: resParentId, bookings: props.bookedRooms}),
                });
                const jsonData = await response.json();
                console.log('insertReservation LEFT = ', jsonData);
            } catch (error) {
                console.error(error);
            }
        }

        if(resParentId !== 0) insertReservation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resParentId]);

// onClick={()=>closeCalendar()} 
    return (
        <div className='viewPortDetails' >
            <p style={{fontSize: 25}} className='detailsTitle'>{title}</p>
            
            <div className='detailsFrame'>
                <div className='detailsFlexBox'>
                    <div className='bookingForSelf' onClick={()=>handleBookerClick('self')}><IoCheckmarkOutline className='checkMarkSelf'/>{bookerSelf}</div>
                    <div className='bookingForOther' onClick={()=>handleBookerClick('other')}><IoCheckmarkOutline className='checkMarkOther'/>{bookerOther}</div>
                </div>
                {/* First block - booker details */}
                <p style={{fontSize: 20, fontWeight: 'normal'}} className='detailsTitle'>{bookerDetail}</p>
                <div className='detailsFlexBox'>
                    <div className='inputCellInDetailsLeft'>
                        <p style={{fontSize: 10}}>{firstName}</p>
                        <input id='bookerFN' type='text' className='inputBoxDetails' value={bookerInfo.firstName} onChange={handleBookerFN} />
                    </div>
                    <div className='inputCellInDetailsRight'>
                        <p style={{fontSize: 10}}>{lastName}</p>
                        <input id='bookerLN' type='text' className='inputBoxDetails' value={bookerInfo.lastName} onChange={handleBookerLN} />
                    </div>
                </div>
                <div className='detailsFlexBox'>
                    <div className='inputCellInDetailsLeft'>
                        <p style={{fontSize: 10}}>{email}</p>
                        <input id='bookerEmail' type='text' className='inputBoxDetails' value={bookerInfo.email} onChange={handleBookerEmail} />
                        <p style={{fontSize: 10}}>{emailText}</p>
                    </div>
                    <div className='inputCellInDetailsRight'>
                        <p style={{fontSize: 10}}>{phoneNum}</p>
                        <input id='bookerPhone' type='text' className='inputBoxDetails' value={bookerInfo.phone} onChange={handleBookerPhone} />
                    </div>
                </div>
                <div id='bookerContainer'>
                    <div className='detailsFlexBox'>
                        <div className='inputCellInDetailsLeft'>
                            <p style={{fontSize: 10}}>{nationality}</p>
                            <input id='bookerCountry' type='text' className='inputBoxDetails' value={bookerInfo.country} onChange={handleBookerCountry}/>
                        </div>
                    </div>
                    <div className='detailsSpace'></div>
                    <div className='instruction'>
                        <p style={{fontSize: 10}}>{instruction}</p>
                    </div>
                    <textarea className='detailsFlexBox' name='detailInstruction' id='detailInstruction' value={bookerInfo.instruction} onChange={handleBookerInstruction} ></textarea>
                </div>

                {/* First block - guest details */}
                <div id='guestContainer'>
                    <p style={{fontSize: 20, fontWeight: 'normal'}} className='detailsTitle'>{guestDetail}</p>
                    <div className='detailsFlexBox'>
                        <div className='inputCellInDetailsLeft'>
                            <p style={{fontSize: 10}}>{firstName}</p>
                            <input id='guestFN' type='text' className='inputBoxDetails' value={guestInfo.firstName} onChange={handleGuestFN}/>
                        </div>
                        <div className='inputCellInDetailsRight'>
                            <p style={{fontSize: 10}}>{lastName}</p>
                            <input id='guestLN' type='text' className='inputBoxDetails' value={guestInfo.lastName} onChange={handleGuestLN} />
                        </div>
                    </div>
                    <div className='detailsFlexBox'>
                        <div className='inputCellInDetailsLeft'>
                            <p style={{fontSize: 10}}>{email}</p>
                            <input id='guestEmail' type='text' className='inputBoxDetails' value={guestInfo.email} onChange={handleGuestEmail}/>
                            <p style={{fontSize: 10}}>{emailText}</p>
                        </div>
                        <div className='inputCellInDetailsRight'>
                            <p style={{fontSize: 10}}>{phoneNum}</p>
                            <input id='guestPhone' type='text' className='inputBoxDetails' value={guestInfo.phone} onChange={handleGuestPhone} />
                        </div>
                    </div>
                    <div className='detailsFlexBox'>
                        <div className='inputCellInDetailsLeft'>
                            <p style={{fontSize: 10}}>{nationality}</p>
                            <input type='text' className='inputBoxDetails' value={guestInfo.country} onChange={handleGuestCountry}/>
                        </div>
                    </div>
                    <div className='detailsSpace'></div>
                    <div className='instruction'>
                        <p style={{fontSize: 10}}>{instruction}</p>
                    </div>
                    <textarea className='detailsFlexBox' name='detailInstruction' id='detailInstruction' value={guestInfo.instruction} onChange={handleGuestInstruction}></textarea>
                </div>
            </div>

            {/* Below if the paylement info block */}
            <p style={{fontSize: 20}} className='detailsTitle'>{payment}</p>
            <div className='detailsFrame'>
                <div className='paymentLogos'>
                    {paymentLogoTxt}
                </div>
                <div className='detailsFlexBox'>
                    <div className='inputCellInDetailsLeft'>
                        <p style={{fontSize: 10}}>{cardNum}</p>
                        <input id='cardNum' type='text' className='inputBoxDetails' />
                    </div>
                    <div className='inputCellInDetailsExpCVV'>
                        <div className='inputCellInDetailsRight1'>
                            <p style={{fontSize: 10}}>{expDate}</p>
                            <input id='expDate' type='text' className='inputBoxDetails' />
                        </div>
                        <div className='inputCellInDetailsRight2'>
                            <p style={{fontSize: 10}}>{cvv}</p>
                            <input id='cvv' type='text' className='inputBoxDetails' />
                        </div>
                    </div>
                </div>
                <div className='detailsFlexBox'>
                    <div className='inputCellInDetailsLeft'>
                        <p style={{fontSize: 10}}>{nameOnCard}</p>
                        <input id='nameOnCard' type='text' className='inputBoxDetails' />
                    </div>
                </div>
                {financialDetails}
                {discount > 0 ? discountDisplay : null}
                <hr/>
                <div className='roomPriceContainer'>
                    <p style={{fontSize: 15}} className='typeRateName'>{totalCost}</p>
                    <p style={{fontSize: 15}} className='ratePrice'>{'¥' + totalCostPreTax.toLocaleString()}</p>
                </div>
                <hr/>
                <div className='roomPriceContainer'>
                    <p style={{fontSize: 15}} className='typeRateName'>{totalTax}</p>
                    <p style={{fontSize: 15}} className='ratePrice'>{'¥' + taxTotal.toLocaleString()}</p>
                </div>
                <hr/>
                <div className='roomPriceContainer'>
                    <p style={{fontSize: 15}} className='typeRateName'>{totalCostWTax}</p>
                    <p style={{fontSize: 15}} className='ratePrice'>{'¥' + totalCostPostTax.toLocaleString()}</p>
                </div>
                <hr/>
            </div>
            <div className='continueButtonBox'>
                <Link to='/booking/details' className='continueButton' onClick={()=>handleCommitInput()}>{commit}</Link>
            </div>
            <div className='whiteSpace'></div>

        </div>
    )
}

export default CommitBooking;