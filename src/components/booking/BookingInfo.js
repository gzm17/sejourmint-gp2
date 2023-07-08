import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { IoArrowForward, IoAdd, IoRemove, IoAddCircleOutline, IoBarChartOutline, IoCheckmark, IoChevronDownOutline, IoChevronUpOutline} from "react-icons/io5";

// The following imports the components for presentation
import './BookingInfo.css';
import './BookingHeader.css';

function BookingInfo(props) {

    var title, dates, roomTypes, rates, summary, details, edit;
    if (props.language === 'en') {
        title = 'Select Room Type';
        dates = 'Dates';
        roomTypes = 'Room Types';
        rates = 'Rates';
        summary = 'Summary';
        details = 'Details';
        edit = 'Edit';
    } else if (props.language === 'jp') {
        title = '部屋タイプを選択する';
        dates = '日付';
        roomTypes = '部屋タイプ';
        rates = '料金';
        summary = 'サマリー';
        details = '詳細';
        edit = '編集';
    } else if (props.language === 'ch1') {
        title = '选择客房种类';
        dates = '日期';
        roomTypes = '客房种类';
        rates = '房价';
        summary = '总额';
        details = '详细';
        edit = '更新';
    } else if (props.language === 'ch2') {
        title = '選擇客房種類';
        dates = '日期';
        roomTypes = '客房種類';
        rates = '房價';
        summary = '總額';
        details = '詳細';
        edit = '更新';
    } else {};

    const numOfGuests = props.booking.adults + props.booking.kids;
    const numOfDays = Math.round((props.booking.checkout.getTime() - props.booking.checkin.getTime())/(24*60*60*1000)) - 1;

// onClick={()=>closeCalendar()} 
    return (
        <div className='bookingInfoFrame' >
            <div className='selectedDates'>
                <div className='selectedDatesTitle'>{'Selected Dates: ' + numOfDays }</div>
                <div className='selectedDatesInfo'>{props.booking.checkin.toDateString() + ' - ' + props.booking.checkout.toDateString()}</div>
            </div>
            <div className='selectedGuestNums'>
                <div className='selectedGuestNumsTitle'>{'Selected Guests: ' + numOfGuests }</div>
                <div className='selectedGuestNumsInfo'>{'Adults - ' + props.booking.adults + '  /  Children - ' + props.booking.kids}</div>
            </div>
            <Link to='/booking/dates' className='bookingInfoEditButton'>{edit}</Link>
            {/* <div className='bookingInfoEditButton'>
                Edit
            </div> */}
        </div>
    )
}

export default BookingInfo;