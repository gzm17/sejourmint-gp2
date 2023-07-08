import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { IoArrowForward, IoAdd, IoRemove, IoAddCircleOutline, IoBarChartOutline, IoCheckmark, IoChevronDownOutline, IoChevronUpOutline, IoPersonOutline, IoCalendarClearOutline} from "react-icons/io5";
import { PropTypes } from "prop-types";

// The following imports the components for presentation
// import './BookingInfo.css';
import './BookingHeader.css';
// import '../PhotoFrameMany.css';
import './RoomTypes.css';
import {roomType2} from '../../data/rooms/roomTypes2';
import PhotoFrameMany from '../PhotoFrameMany';

export function RoomTypesAvailable(props) {

    var title, dates, roomTypes, rates, summary, details, maxGuests, taxExcluded, select;
    if (props.language === 'en') {
        title = 'Select Room Type';
        maxGuests = 'Maximum Persons';
        taxExcluded = 'Excluding 10% Consumption Tax';
        select = 'Select';
        dates = 'Dates';
        roomTypes = 'Room Types';
        rates = 'Rates';
        summary = 'Summary';
        details = 'Details';
    } else if (props.language === 'jp') {
        title = '部屋タイプを選択する';
        maxGuests = '定員';
        taxExcluded = '10％消費税を抜いて';
        select = '選ぶ';
        dates = '日付';
        roomTypes = '部屋タイプ';
        rates = '料金';
        summary = 'サマリー';
        details = '詳細';
    } else if (props.language === 'ch1') {
        title = '选择客房种类';
        maxGuests = '定员';
        taxExcluded = '不包10%消费税';
        select = '选择';
        dates = '日期';
        roomTypes = '客房种类';
        rates = '房价';
        summary = '总额';
        details = '详细';
    } else if (props.language === 'ch2') {
        title = '選擇客房種類';
        maxGuests = '定員';
        taxExcluded = '不包10%的消費稅';
        select = '選擇';
        dates = '日期';
        roomTypes = '客房種類';
        rates = '房價';
        summary = '總額';
        details = '詳細';
    } else {};

    var price = 16000; // later replace by query result    
    // console.log('grand p values - ', props.booking.adults);

    // START: The following fetches the DB room_rates table in order to get the basic rates
    // Holder of rates table - do not really need a state but the code works
    const [ratesTable, setRatesTable] = useState({});
    useEffect(() => {

        async function getRatesTable() {
            try {
                const response = await fetch('http://localhost:3001/getRatesTable', {
                    method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({IsFetchingRates: true}),
                });
                const jsonData = await response.json();
                console.log('Rates Table = ', jsonData);
                setRatesTable(jsonData);
            } catch (error) {
                console.error(error);
            }
        }
        getRatesTable();
        // console.log('FETCHED DATA = ', roomRates);
    }, [])

    // END fetching room_rates table


    function handleUpdate(roomT) {
        let booking = props.booking;
        booking.type = roomT.type;
        booking.typeName = roomT.name;
        booking.typeNameJ = roomT.nameJ;
        booking.typeId = roomT.dbId;
        // booking.currentStep = (booking.currentStep === 2 ? 3 : booking.currentStep );
        // booking.viewStep = 3;
        const steps = {
            currentStep: (props.steps.currentStep === 2)? 3 : props.steps.currentStep,
            viewStep: 3
        }
        props.updateBooking(booking);
        props.updateSteps(steps);
        // console.log('UPDATE TYPE = ', booking);
    }

    const roomTypesAvailable = props.availableRooms;

    // Filter out the room type that is still available for booking 
    const roomTypesAvailablePack = roomTypesAvailable.map((type, index) => {
        // link to the data file for the room type
        const roomT = roomType2.filter((rt) => rt.type === type)[0];
        // find dbId for the room type, and then populate price for the lowest rate
        for (var i = 0; i < ratesTable.length; i++) {
            // console.log('ENTER LOOP i ratesT type = ', i, ratesTable[i], roomT);
            if (roomT.dbId === ratesTable[i].room_type_id ) {
                price = Number(ratesTable[i].rate);
                // console.log('Found Rate = ', price);
                break;
            }
        }

        return (
            <div className='typeBox' key={index}>
                <div className='phtoFrameManyContainer'>
                    <PhotoFrameMany images={roomT.images} caption={''} contentType={roomT.name} fontIsBlack='true' />
                </div>
                <div className='maxGuests'>
                    <IoPersonOutline className='maxGuestsSpace'/>
                    <p className='pFontSize'>{'  ' + maxGuests + ' ' + roomT.numGuests}</p>
                </div>
                <div className='roomTPrice'>
                    <div className='roomTPriceWords'>
                        <p style={{fontSize: 15, margin: 0}}>From</p>
                        <p style={{fontSize: 20, margin: 0}}>{'JPY ' + price.toLocaleString() + ' per Day'}</p>
                        <p style={{fontSize: 15, margin: 0}}>{taxExcluded}</p>
                    </div>
                    <div className='roomTPriceProceed'>
                        <Link to='/booking/rates' className='roomTPriceProceedButton' onClick={()=>handleUpdate(roomT)}>{select}</Link>
                    </div>
                    <Outlet/>
                </div>
            </div>
        )
    })

// onClick={()=>closeCalendar()} 
    return (
            <> 
            {roomTypesAvailablePack}
            </>
    )
}

export function RoomTypesUnavailable(props) {

    var title, dates, roomTypes, rates, summary, details, maxGuests, taxExcluded, select;
    if (props.language === 'en') {
        title = 'Select Room Type';
        maxGuests = 'Maximum Persons';
        taxExcluded = 'Excluding 10% Consumption Tax';
        select = 'Select';
        dates = 'Dates';
        roomTypes = 'Room Types';
        rates = 'Rates';
        summary = 'Summary';
        details = 'Details';
    } else {
        title = '部屋タイプを選択する';
        maxGuests = '定員';
        taxExcluded = '10％消費税を抜いて';
        select = '選ぶ';
        dates = '日付';
        roomTypes = '部屋タイプ';
        rates = '料金';
        summary = 'サマリー';
        details = '詳細';
    }

    // const roomTypesAvailable = ['standard1',  'standard2', 'family1', 'family2']
    const roomTypesUnavailable = props.unAvailableRooms;
    // Filter out the room type that is NOT available for booking 
    const roomTypesUnavailablePack = roomTypesUnavailable.map((type, index) => {
        const roomT = roomType2.filter((rt) => rt.type === type)[0];


        return (
            <div className='typeBox' key={index}>
                <div className='phtoFrameManyContainer'>
                    <PhotoFrameMany images={roomT.images} caption={''} contentType={roomT.name} fontIsBlack='true' />
                </div>
                <div className='maxGuests'>
                    <IoPersonOutline className='maxGuestsSpace'/>
                    <p className='pFontSize'>{'  ' + maxGuests + ' ' + roomT.numGuests}</p>
                </div>
            </div>
        )
    })

    return (
        <> 
        {roomTypesUnavailablePack}
        </>
    )
}

// This component is used in the SelectRate component and it shows the selected room type only *from SelectRoomType
// This shows its contents horizontally 
export function SelectedRoomType(props) {
    var title, occupancy, maxGuests, rates;
    if (props.language === 'en') {
        title = 'Select Rate';
        occupancy = 'Occupancy';
        maxGuests = 'Maximum Persons';
        rates = 'Rates';
    } else {
        title = '価格を選ぶ';
        occupancy = '宿泊';
        maxGuests = '定員';
        rates = '料金';
    }

    const roomTypesAvailable = ['standard1',  'standard2', 'family1', 'family2'], roomTypesUnavailable = ['group'];
    // Filter out the room type that is still available for booking 

    const roomT = roomType2.filter((rt) => rt.type === props.type)[0];

    let type, detail;
    if (props.language === 'en') {
        type = roomT.name;
        detail = roomT.caption;
    } else { 
        type = roomT.nameJ;
        detail = roomT.captionJ;
    }

    return (
        <div className='selectedTypeBox'>
            <div className='selectedTypeImgFrame'>
                <PhotoFrameMany images={roomT.images} caption={''} contentType={''} fontIsBlack='true' />
            </div>
            <div className='selectedTypeDetail'>
                <p style={{fontSize: 25, margin: 15}}>{type}</p>
                <div className='maxGuests'>
                    <IoPersonOutline className='maxGuestsSpace'/>
                    <p style={{fontSize: 20, margin: 15}}>{maxGuests + ' ' + roomT.numGuests}</p>
                </div>
                <p style={{fontSize: 20, margin: 15}}>{detail}</p>
            </div>
        </div>
    )
}

// This component is used in the Summary component and it shows the selected room type from earlier steps
// This shows its contents horizontally 
// This is very similar to SelectedRoomType except the data content is slight different (now show rates) plus removal/editing features
export function SelectedRoomTypeSummmary(props) {
    const bookedRooms = [...props.bookedRooms]; // clone the array

    // the function deletes the selected room then send view step to Dates (if edit is selected)
    function handleUpdate(input) {
        // e.preventDefault();
        let b = bookedRooms[input.index];
        let a = bookedRooms;
        if (a.length === 1) {
            props.updateSteps({currentStep: props.steps.currentStep - 1, viewStep: props.steps.viewStep - 1});
            console.log('STEPS update in Summ ', props.steps.currentStep, props.steps.viewStep);
        }
        // console.log('ZZZZ b.length input.index ', b.length, input.index);
        props.deleteBookedRoom(input.index);

        if (input.act ==='edit') {
            // console.log('2 SPLICED CALLER: index', input.act, input.index);
            props.updateBooking(b);
        }
    }

    // console.log('STEPS in SUMMARY - ', props.steps.currentStep, props.steps.viewStep);
    const summaryRoomTs = bookedRooms.map((booking, index) => {
        const roomT = roomType2.filter((rt) => booking.type === rt.type)[0]; // get the right room type for photos. Only used in PhotoFrameMany

        // console.log('bookedRoom index ', index);
        // This little block for language translation
        let type, adults, kids, remove, edit; 
        if (props.language === 'en') {
            type = roomT.name;
            adults = 'Adult: ' + booking.adults;
            booking.kids > 0? (kids = 'Children: ' + booking.kids.toString()) : (kids = '');
            remove = 'Remove';
            edit = 'Edit';
        } else { 
            type = roomT.nameJ;
            adults = '大人：' + booking.adults;
            booking.kids > 0? (kids = '子供: ' + booking.kids) : (kids = '');
            remove = '削除';
            edit = '編集';
        }
    
        return (
            <div key={index} className='selectedTypeSumBox'>
                <div className='selectedTypeSumImgFrame'>
                    <PhotoFrameMany images={roomT.images} caption={''} contentType={''} fontIsBlack='true' />
                </div>
                <div className='selectedTypeSum2ndCol'>
                    <p className='selectedTypeSumTitle' style={{fontSize: 20}}>{type}</p>
                    <div className='selectedTypeSumLine'>
                        <IoCalendarClearOutline className='selectedTypeSumArt' />
                        <p className='selectedTypeSumText' style={{fontSize: 15, margin: 10}}>{booking.checkin.toDateString() + ' - ' + booking.checkout.toDateString()}</p>
                    </div>
                    <div className='selectedTypeSumLine'>
                        <IoPersonOutline className='selectedTypeSumArt'/>
                        <p className='selectedTypeSumText' style={{fontSize: 15, margin: 10}}>{adults + ' ' + kids}</p>
                    </div>
                    <div className='selectedTypeSumLine'>
                        <IoBarChartOutline className='selectedTypeSumArt' />
                        <p className='selectedTypeSumText' style={{fontSize: 15, margin: 10}}>{'Rate: ' + booking.rate}</p>
                    </div>
                </div>
                <div className='selectedTypeSum3rdCol'>
                    <p className='selectedTypeSumText1' style={{fontSize: 20, margin: 10}}>{'JPY ' + booking.price.toLocaleString()} </p>
                    <div className='selectedTypeSumLine1'>
                        {
                            bookedRooms.length > 1?
                            <div className='selectedTypeRemoveButton' onClick={()=>handleUpdate({index: index, act: 'remove'})}> {remove}</div> : 
                            <Link to='/booking/dates' className='selectedTypeRemoveButton' onClick={()=>handleUpdate({index: index, act: 'remove'})}> {remove}</Link> 
                        }
                        <Link to='/booking/dates' className='selectedTypeEditButton' onClick={()=>handleUpdate({index: index, act: 'edit'})}> {edit} </Link>
                    </div>
                    {/* <Outlet/> */}
                </div>
            </div>
        )

    })

    return(
        <>
        {summaryRoomTs}
        </>
    )
}

SelectedRoomTypeSummmary.propTypes = {
    language: PropTypes.string,
    bookedRooms: PropTypes.array,
    updateBooking: PropTypes.func,
    updateBookedRoomsLocal: PropTypes.func
}