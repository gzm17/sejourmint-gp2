import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import { IoArrowForward, IoAdd, IoRemove, IoAddCircleOutline, IoBarChartOutline, IoCheckmark, IoChevronDownOutline, IoChevronUpOutline} from "react-icons/io5";

// The following imports the components for presentation
import BookingInfo from './BookingInfo';
import {RoomTypesAvailable, RoomTypesUnavailable} from './RoomTypes';
import './SelectRoomType.css';
import './BookingHeader.css';

function SelectRoomType(props) {

    // console.log('ENETRING room type');

    var title, unavail, dates, roomTypes, rates, summary, details;
    if (props.language === 'en') {
        title = 'Select Room Type';
        unavail = 'Room Type Unavailable';
        dates = 'Dates';
        roomTypes = 'Room Types';
        rates = 'Rates';
        summary = 'Summary';
        details = 'Details';
    } else if (props.language === 'jp') {
        title = '部屋タイプを選択する';
        unavail = '満室の部屋タイプ';
        dates = '日付';
        roomTypes = '部屋タイプ';
        rates = '料金';
        summary = 'サマリー';
        details = '詳細';
    } else if (props.language === 'ch1') {
        title = '选择客房类型';
        unavail = '已满的客房类型';
        dates = '日期';
        roomTypes = '客房类型';
        rates = '房价';
        summary = '汇总';
        details = '详细';
    } else if (props.language === 'ch2') {
        title = '選擇客房類型';
        unavail = '已滿的客房類型';
        dates = '日期';
        roomTypes = '客房類型';
        rates = '房價';
        summary = '匯總';
        details = '詳細';
    } else {};

// Get Available Rooms from Querying database
useEffect(() => {
    const d1 = props.booking.checkin, d2 = props.booking.checkout;
    const date1 = d1.getFullYear() + '-' + (d1.getMonth()+1) + '-' + d1.getDate();
    const date2 = d2.getFullYear() + '-' + (d2.getMonth()+1) + '-' + d2.getDate();
    // console.log('getAvailableRooms Inputs = ', date1, date2, typeof date1);
    props.getAvailableRooms(date1.toString(), date2.toString());
  }, []);

const tmp1 = props.availableRooms.filter(room => Number(room.rooms_used) > 0);
const availableRooms = tmp1.map(room => {
    if(room.room_type === 'Family 1') {return 'family1'}
    else if(room.room_type === 'Family 2') {return 'family2'}
    else if(room.room_type === 'Standard 1') {return 'standard1'}
    else if(room.room_type === 'Standard 2') {return 'standard2'}
    else {return 'group'}
});

const tmp2 = props.availableRooms.filter(room => Number(room.rooms_used) === 0);
const unAvailableRooms = tmp2.map(room => {
    if(room.room_type === 'Family 1') {return 'family1'}
    else if(room.room_type === 'Family 2') {return 'family2'}
    else if(room.room_type === 'Standard 1') {return 'standard1'}
    else if(room.room_type === 'Standard 2') {return 'standard2'}
    else {return 'group'}
});
// console.log('AVAIL ROOMS & UNAVAIL ROOMS ', availableRooms, unAvailableRooms, tmp2, props.availableRooms);
// console.log('DATES ', props.booking.checkin, props.booking.checkout);

// onClick={()=>closeCalendar()} 
    return (
        <div className='viewPortSelectRoomType' >
            <h2 className='selectRoomTypeTitle'>{title}</h2> 
            <BookingInfo booking={props.booking} />
            <div className='availableTypesFrame'>
                <RoomTypesAvailable language={props.language} booking={props.booking} updateBooking={(b)=>props.updateBooking(b)} steps={props.steps} updateSteps={(s)=>props.updateSteps(s)} availableRooms={availableRooms}/>
            </div>
            <h3 className='selectRoomTypeTitle'>{unavail}</h3>
            <div className='availableTypesFrame'>
                <RoomTypesUnavailable language={props.language} booking={props.booking} updateBooking={(b)=>props.updateBooking(b)} unAvailableRooms={unAvailableRooms} />
            </div>
            <div className='whiteSpace'></div>
        </div>
    )
}

export default SelectRoomType;