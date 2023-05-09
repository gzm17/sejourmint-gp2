import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { IoArrowForward, IoAdd, IoRemove, IoAddCircleOutline, IoBarChartOutline, IoCheckmark, IoChevronDownOutline, IoChevronUpOutline} from "react-icons/io5";

// The following imports the components for presentation
import BookingInfo from './BookingInfo';
import {SelectedRoomType, RoomTypesUnavailable} from './RoomTypes';
import {roomRates} from '../../data/rooms/roomRates';
import './SelectRoomType.css';
import './BookingHeader.css';
import './SelectRates.css';


function SelectRates(props) {

    // console.log('ENETRING room type');
    const [roomRates, setRoomRates] = useState([]); // array holder of rates from db

    var title, unavail, dates, rates, summary, details, instruction, book, caveat;
    if (props.language === 'en') {
        title = 'Select Rates';
        unavail = 'Room Type Unavailable';
        dates = 'Dates';
        rates = 'Rates';
        summary = 'Summary';
        details = 'Details';
        instruction = 'Instruction';
        book = 'Book';
        caveat = 'We endeaver to make your stay as comfortable as possible. To this end, let us know if you have any special requirements. For example, you require pickup from the train station (be sure tell us the arrival time). We may not be able to meet all your needs, but we will do our best.'
    } else if (props.language === 'jp') {
        title = 'プランを選ぶ';
        unavail = '満室の部屋タイプ';
        dates = '日付';
        rates = '料金';
        summary = 'サマリー';
        details = '詳細';
        instruction = '特別な要求';
        book = '予約';
        caveat = 'We endeaver to make your stay as comfortable as possible. To this end, let us know if you have any special requirements. For example, you require pickup from the train station (be sure tell us the arrival time). We may not be able to meet all your needs, but we will do our best.'
    } else if (props.language === 'ch1') {
        title = '选择服务计划';
        unavail = '已满的客房种类';
        dates = '日期';
        rates = '房价';
        summary = '总额';
        details = '詳详细細';
        instruction = '要求';
        book = '订房';
        caveat = '我们致力于让你的住宿尽可能舒适。为此，请告诉我们你是否有任何特殊需求。例如，你需要从火车站接车（请务必告诉我们抵达时间）。我们可能无法满足你的所有需求，但我们会尽力而为。'
    } else if (props.language === 'ch2') {
        title = '選擇服務計畫';
        unavail = '已滿的客房種類';
        dates = '日期';
        rates = '房價';
        summary = '總額';
        details = '詳細';
        instruction = '要求';
        book = '訂房';
        caveat = '我們致力於使你的住宿盡可能舒適。為此，如果你有任何特殊需求，請讓我們知道。例如，你需要從火車站接站（請務必告知我們到站時間）。我們可能無法滿足你的所有需求，但我們將盡力而為。'
    } else {};

    // The following code gets rates from the selected room type, upon first rendering (therefore 
    // useEffect( []) is used
    useEffect(() => {
        const d1 = props.booking.checkin, d2 = props.booking.checkout;
        const date1 = d1.getFullYear() + '-' + (d1.getMonth()+1) + '-' + d1.getDate();
        const date2 = d2.getFullYear() + '-' + (d2.getMonth()+1) + '-' + d2.getDate();
        // console.log('getAvailableRooms Inputs = ', date1, date2, typeof date1);
        async function getRates() {
            try {
                const response = await fetch('http://localhost:3001/getRates', {
                    method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({typeId: props.booking.typeId, checkin: date1.toString(), checkout: date2.toString()}),
                });
                const jsonData = await response.json();
                // console.log('RATES = ', jsonData);
                setRoomRates(jsonData);
            } catch (error) {
                console.error(error);
            }
        }
        getRates();
        // console.log('FETCHED DATA = ', roomRates);
    }, [])

    function handleBooking(rate) {
        console.log('room type = ', props.booking.type, 'RATE = ', rate);
        const ins = document.getElementById('instructionText').value;
        // console.log('TEXTINPUT ', ins);
        let b = props.booking;
        b.instruction = ins;
        b.rateId = rate.rateId;
        b.rate = rate.name;
        b.rateName = rate.rateName;
        b.rateNameJ = rate.rateNameJ;
        b.price = rate.price;
        b.currentStep = (b.currentStep === 3 ? 4 : b.currentStep);
        b.viewStep = 4;
        props.updateBooking(b);
        props.addRoom(b);
        const steps = {
            currentStep: (props.steps.currentStep === 3)? 4 : props.steps.currentStep,
            viewStep: 4
        }
        props.updateSteps(steps);
    }

    const ratesJSX = roomRates.map(rate => {
        // if (rate.roomType === props.booking.type) {
            return (
                <div key={rate.id}>
                    {/* <p style={{fontSize: 20}}>{rate.rate_name}</p>
                    <p style={{fontSize: 17}}>{rate.description}</p>
                    <div className='oneRateBox'>
                        <div className='oneRateBoxText'>
                            <p style={{fontSize: 25}}>{'JPY ' + rate.rate.toLocaleString()}</p>
                            <p style={{fontSize: 15}}>(Excluding Tax)</p>
                        </div>
                        <Link to='/booking/summary' className='oneRateBoxButton' onClick={()=>handleBooking({name: 'Basic', rateName: rate.rate_name, rateNameJ: rate.rate_name, price: rate.rate})}>{book}</Link>
                    </div>
                    <hr/>
                    <p style={{fontSize: 20}}>{rate.rate_name}</p>
                    <p style={{fontSize: 17}}>{rate.description}</p>
                    <div className='oneRateBox'>
                        <div className='oneRateBoxText'>
                            <p style={{fontSize: 25}}>{'JPY ' + rate.rate.toLocaleString()}</p>
                            <p style={{fontSize: 15}}>Excluding Tax</p>
                        </div>
                        <Link to='/booking/summary' className='oneRateBoxButton' onClick={()=>handleBooking({name: 'Medium', rateName: rate.rate_name, rateNameJ: rate.rate_name, price: rate.rate})}>{book}</Link>
                    </div> */}
                    <p style={{fontSize: 20}}>{rate.rate_name}</p>
                    <p style={{fontSize: 17}}>{rate.description}</p>
                    <div className='oneRateBox'>
                        <div className='oneRateBoxText'>
                            <p style={{fontSize: 25}}>{'JPY ' + rate.rate.toLocaleString()}</p>
                            <p style={{fontSize: 15}}>Excluding Tax</p>
                        </div>
                        <Link to='/booking/summary' className='oneRateBoxButton' onClick={()=>handleBooking({name: 'Delux', rateName: rate.rate_name, rateNameJ: rate.rate_name, price: rate.rate, rateId: rate.id})}>{book}</Link>
                    </div>
                    <hr/>
                    <Outlet/>
                </div>
            )
        // } 
    })


// onClick={()=>closeCalendar()} 
    return (
        <div className='viewPortSelectRates' >
            <h2 className='selectRatesTitle'>{title}</h2> 
            <BookingInfo booking={props.booking} />
            <div className='selectedRoomType'>
                <SelectedRoomType language={props.language} type={props.booking.type} />
            </div>
            <div className='selectRatesBox'>
                <div className='selectRatesBoxLeftCol'>
                    <p className='ratesTitle' style={{fontSize: 25, margin: 15}}>{rates}</p>
                    <div className='ratesBox'>
                        {ratesJSX}
                    </div>
                </div>
                <div className='selectRatesBoxRightCol'>
                    <p className='ratesTitle' style={{fontSize: 25, margin: 15}}>{instruction}</p>
                    <div className='instructionBox'>
                        <p style={{fontSize: 17}}>{caveat}</p>
                        <textarea id='instructionText' name='instruction' placeholder='Enter instructions here. Please be brief and to the point. Thanks.'></textarea>
                    </div>
                </div>
            </div>
            <div className='whiteSpace'></div>
        </div>
    )
}

export default SelectRates;