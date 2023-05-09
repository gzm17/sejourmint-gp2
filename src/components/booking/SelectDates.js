import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import { IoArrowForward, IoAdd, IoRemove, IoAddCircleOutline, IoBarChartOutline, IoCheckmark, IoChevronDownOutline, IoChevronUpOutline} from "react-icons/io5";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarCustom.css';


// The following imports the components for presentation
import './SelectDates.css';
import './BookingHeader.css';

function SelectDates(props) {
    // declare states for rendering upon changes of values of these variables
    const [numGuests, setNumGuests] = useState({adults: props.booking.adults, kids:props.booking.kids});
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [promoCode, setPromoCode] = useState('');

    let minDate = new Date(); // minDate: a property of react-calendar - any date earlier than this, is not selectable

    // New calendar:
    // const [calendarValue, setCalendarValue] = useState(new Date());

    function handleClickDay(value, event, view) {
        console.log('value[0] = ', value[0], ' value[1] = ', value[1]);
        // Check if the value array already has two dates
        if (value.length === 2) {
          // If it does, replace the second date with the clicked date
          //const newValue = [value[0], date];
          setDate(value);
        } else {
          // If it doesn't, add the clicked date to the array
          const newValue = [...value, value[0]];
          setDate(newValue);
        }
      }

    // function isDateDisabled({ date, view }) {
    // // Check if this is the same date as the previous tile in the same row
    // //if (view === 'doubleView') {
    //     const { activeStartDate } = date;
    //     const previousDate = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth(), activeStartDate.getDate() - 1);
    //     const { activeStartDate: previousStartDate } = previousDate;
    //     if (previousStartDate === activeStartDate) {
    //     return true;
    //     }
    // //}
    
    // // Return false to enable the tile
    // return false;
    // }
    // New calendar - END:


    // Prepare bilingual titles
    var dates, roomTypes, rates, summary, details, alertMsg;
    if (props.language === 'en') {
        dates = 'Dates';
        roomTypes = 'Room Types';
        rates = 'Rates';
        summary = 'Summary';
        details = 'Details';
        alertMsg = 'This booking section is NOT operatoinal yet, pending on system integration. When ready, you will not see this message. Meanwhile, to book, please email us at info@sejourmint.com or call us. See Contact Us section. Thanks.'
    } else if (props.language === 'jp') {
        dates = '日付';
        roomTypes = '部屋タイプ';
        rates = '料金';
        summary = 'サマリー';
        details = '詳細';
        alertMsg = 'この予約セクションは、システムの統合を待っているため、まだ稼働していません。準備ができたら、このメッセージは表示されなくなります。その間、ご予約はinfo@sejourmint.comまでメールいただくか、お電話いただくか、Contact Usセクションをご覧ください。ありがとうございます。';
    } else if (props.language === 'ch1') {
        dates = '日期';
        roomTypes = '客房种类';
        rates = '房价';
        summary = '总额';
        details = '详细';
        alertMsg = '这个订房部分目前还没有运行，正在等待系统集成。当准备就绪后，这个警告将不再出现。在此期间，请发送电子邮件到info@sejourmint.com或给我们打电话来预订。请参见“联系我们”部分。谢谢。';
    } else if (props.language === 'ch2') {
        dates = '日期';
        roomTypes = '客房種類';
        rates = '房價';
        summary = '總額';
        details = '詳細';
        alertMsg = '这个訂房部分目前還沒有運行，正在等待系統集成。當準備就緒後，這個警告將不再出現。在此期間，請發送電子郵件到info@sejourmint.com或給我們打電話來預訂。請參見“聯繫我們”部分。謝謝。';
    } else {};

    // Below is temporary to alert users that the booking section is not operational yet.
    useEffect(()=> {
        alert(alertMsg);
    }, [])
    // numer of guests
    function updateNumGuests(choiceMade) {
        // console.log('numGuests clicked - 2 ', numGuests.adults, choiceMade);
        if (choiceMade.isAdults) {
            if (choiceMade.isPlus) {
                setNumGuests({adults: numGuests.adults + 1, kids: numGuests.kids});
            } else {
                if (numGuests.adults > 0) {
                    setNumGuests({adults: numGuests.adults - 1, kids: numGuests.kids});
                }
            }
        } else {
            if (choiceMade.isPlus) {
                setNumGuests({adults: numGuests.adults, kids: numGuests.kids + 1});
            } else {
                if (numGuests.kids > 0) {
                    setNumGuests({adults: numGuests.adults, kids: numGuests.kids - 1});
                }
            }
        }
    }

    // toggle - close and open - promo code input field
    function togglePromo() {
        document.getElementsByClassName('promoCodeTeaser')[0].style.display = 'none';
        document.getElementsByClassName('promoCodeInput')[0].style.display = 'block';
    }

    // this function takes the value from the input box - not implemented
    function handlePromoCodeInput(e) {
        const {value} = e.target;
        console.log('entered promoCode box = ', value);
        setPromoCode(value);
    }

    // open calendar modal
    function openCalendar(){
        if(!calendarIsOpen) {
            document.getElementsByClassName('calendarFrame')[0].style.display = 'flex';
            setCalendarIsOpen(true);
        } else {
            document.getElementsByClassName('calendarFrame')[0].style.display = 'none';
            setCalendarIsOpen(false);
        }
    }
    // close calendar modal when clicking outside of the calendar
    function closeCalendar(e){
        const calendarBox = document.getElementsByClassName('calendarFrame')[0];
        // console.log('clicked target = ', e.target);
        if(calendarIsOpen) {
            calendarBox.style.display = 'none';
            setCalendarIsOpen(false);
        } 
    }

    // function getEvent(e){
    //     console.log('cal event target is ', e.target);
    // }

    // dates arithmatic 
    const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const weekName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let arrivalDate = new Date(props.booking.checkin);
    let departDate = new Date(props.booking.checkout);

    // If currentStep > 1 - meaning the user has done this step already but revisiting, set numGuests and date to previously chosen values
    // if (props.booking.currentStep > 1) {
    //     arrivalDate = props.booking.checkin;
    //     departDate = props.booking.checkout;
    // }
    if (date.length > 0) { // react-calendar: selected dates are stored in state var date as array, [0] is first date, [1] is the second date
        arrivalDate = date[0];
        departDate = date[1];
        // console.log('date length = ', date.length, date)
    } 
    // console.log('departDATE = ', departDate, typeof departDate);

    // else {
    //     if (props.booking.currentStep === 1) {
    //         arrivalDate = new Date();
    //         departDate = new Date();
    //         departDate.setDate(departDate.getDate() + 3);
    //     }
    // }
    let arrivalDateNum = arrivalDate.getDate();
    let arrivalDateMonth = monthName[arrivalDate.getMonth()];
    let arrivalDateYear = arrivalDate.getFullYear();
    let arrivalDateWeekday = weekName[arrivalDate.getDay()];
    let departDateNum = departDate.getDate();
    let departDateMonth = monthName[departDate.getMonth()];
    let departDateYear = departDate.getFullYear();
    let departDateWeekday = weekName[departDate.getDay()];
    // console.log('DATESS YYYY-MM-DD WK = ', arrivalDateYear, arrivalDateMonth, arrivalDateNum, arrivalDateWeekday)

    // update booking with selected params
    function updateBookingAndSteps() {
        // The following two expressions: b contains the same info as booking but only updates the selected properties
        const booking = props.booking;
        // const b = {
        //     ...booking,
        //     checkin: arrivalDate,
        //     checkout: departDate,
        //     adults: numGuests.adults,
        //     kids: numGuests.kids,
        //     promoCode: promoCode
        //     // currentStep: (props.booking.currentStep > 1) ? props.booking.currentStep : 2,
        //     // viewingStep: (props.booking.viewStep > 1) ? props.booking.viewStep : 2
        // }
        let steps = {
            currentStep: (props.steps.currentStep === 1)? 2 : props.steps.currentStep,
            viewStep: 2
        }
        // props.updateBooking(b);
        props.updateSteps(steps);

        // below submits promoCode and gets back discount rate
        // Sequenced execution of the statements here is not important therefore not using useEffect
        async function submitPromoCode() {
            try {
            const response = await fetch('http://localhost:3001/checkPromoCode', {
                method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({promoCode: promoCode}),
            });
            const jsonData = await response.json();
            console.log('PROMOCODE id and Code = ', jsonData);
            const b = {
                ...booking,
                checkin: arrivalDate,
                checkout: departDate,
                adults: numGuests.adults,
                kids: numGuests.kids,
                promoCode: promoCode,
                discountId: jsonData.id,
                discount: jsonData.discount
                // currentStep: (props.booking.currentStep > 1) ? props.booking.currentStep : 2,
                // viewingStep: (props.booking.viewStep > 1) ? props.booking.viewStep : 2
            }
            props.updateBooking(b);
            } catch (error) {
                console.error(error);
            }
        }
        submitPromoCode();
    }

// onClick={(e)=>{e.stopPropagation()}} onClick={(e)=>getEvent(e)} 

// onClick={()=>closeCalendar()} 
    return (
        <div className='viewPort' onClick={(e)=>closeCalendar(e)} > 

            {/* open calendar modal upon clicking 'arrivalDate' */}
            {/* e.stopPropagation() is for modal behavior: closeCalendar(e) in parent above does not have effect in calendarFrame */}
            <div className='calendarFrame calendar-container' onClick={(e)=>{e.stopPropagation()}} > 
                {/* <Calendar onChange={setDate} value={date} selectRange={true} defaultView='month' minDate={minDate} locale={'en-EN'} /> */}
                <Calendar onChange={handleClickDay} value={[arrivalDate, departDate]} selectRange={true} defaultView='month' minDate={minDate} prev2Label="Prev 2" prevLabel="Prev" nextLabel="Next" next2Label="Next 2" locale={'en-EN'} />
                {/* <Calendar onChange={handleClickDay} value={[arrivalDate, departDate]} selectRange={true} view='month' showDoubleView={true} prev2Label="Prev 2" prevLabel="Prev" nextLabel="Next" next2Label="Next 2" locale={'en-EN'} /> */}
                {/* <Calendar onChange={setDate} value={date} selectRange={true} defaultView='month'/> */}
            </div>

            <div className='selectDateFrame'>
                {/* dates top part */}
                <div className='datesTop'>
                    <div className='arrival'>Arrival</div>
                    <div className='arrow'><IoArrowForward /></div>
                    <div className='departure'>Departure</div>
                </div>

                {/* dates top part */}
                <div className='datesBoxes' onClick={()=>openCalendar()} >
                    <div className='arrivalDate'>
                        <p className='datesDate'>{arrivalDateNum}</p>
                        <p className='datesMonth'>{arrivalDateMonth + ' ' + arrivalDateYear}</p>
                        <p className='datesWeek'>{arrivalDateWeekday}</p>
                    </div>
                    <div className='departDate'>
                        <p className='datesDate'>{departDateNum}</p>
                        <p className='datesMonth'>{departDateMonth + ' ' + departDateYear}</p>
                        <p className='datesWeek'>{departDateWeekday}</p>
                    </div>
                    <div className='dividingLine'></div>
                </div>
                
                {/* number of people selection section */}
                <div className='numGuestsFrame'>
                    <div className='adults'>Adults</div>
                    <div className='kids'>Children (0 - 15 years)</div>
                </div>
                <div className='numGuestsFrame'>
                    <div className='numPicker'>
                        <div id='minus1' onClick={() => updateNumGuests({isAdults: true, isPlus: false})}><IoRemove className='ioSymbol'/></div>
                        <div className='showNum'>{numGuests.adults}</div>
                        <div id='plus1' onClick={() => updateNumGuests({isAdults: true, isPlus: true})}><IoAdd className='ioSymbol'/></div>
                    </div>
                    <div className='numPicker'>
                        <div id='minus1' onClick={() => updateNumGuests({isAdults: false, isPlus: false})}><IoRemove className='ioSymbol'/></div>
                        <div className='showNum'>{numGuests.kids}</div>
                        <div id='plus1' onClick={() => updateNumGuests({isAdults: false, isPlus: true})}><IoAdd className='ioSymbol'/></div>
                    </div>
                </div>
                <div className='dividingLine'></div>

                {/* Last Group - promotion code and next button */}
                <div className='nextButtonFrame'>
                    <div className='promoCodeTeaser'>
                        <IoAddCircleOutline onClick={() => togglePromo()} className='addCircle'/>
                        <div className='promoCodeIntro'>Add Promotional Code</div>
                    </div>
                    <div className='promoCodeInput'>
                        <div className='promoCodeTitle'>Enter promotion code: </div>
                        <input type="text" id="promoCode" onChange={handlePromoCodeInput} className='promoCodeInputBox' name="promoCode" placeholder='Enter code here...'/>
                    </div>
                    <div className='nextButton' to='roomType'>
                        <Link to='/booking/roomTypes' id='forwardLink' onClick={()=>updateBookingAndSteps()}>NEXT</Link>
                    </div>
                    <Outlet/>
                </div>



            </div>
        </div>
    )
}

export default SelectDates;