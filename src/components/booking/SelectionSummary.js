import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { IoArrowForward, IoAdd, IoRemove, IoAddCircleOutline, IoBarChartOutline, IoCheckmark, IoChevronDownOutline, IoChevronUpOutline} from "react-icons/io5";
import { PropTypes } from "prop-types";

// The following imports the components for presentation
import BookingInfo from './BookingInfo';
import {SelectedRoomTypeSummmary} from './RoomTypes';
import './SelectionSummary.css';
import './SelectRoomType.css';
import './BookingHeader.css';
import './SelectRates.css';
import { roomType2 } from '../../data/rooms/roomTypes2';


function SelectionSummary(props) {

    var title, taxTitle, total, totalPreTax, goNext, discountName;
    if (props.language === 'en') {
        title = 'Summary';
        taxTitle = 'Taxes';
        total = 'Total';
        totalPreTax = 'Total Pretax';
        goNext = 'Continue';
        discountName = 'Discount';
    } else if (props.language === 'jp') {
        title = 'サマリー';
        taxTitle = '税金';
        total = '全額(税金こみ）';
        totalPreTax = '全額(税金抜き）';
        goNext = '次へ';
        discountName = '割引';
    } else if (props.language === 'ch1') {
        title = '总额';
        taxTitle = '税金';
        total = '总额（包税）';
        totalPreTax = '总额（不包税）';
        goNext = '下一步';
        discountName = '折扣';
    } else if (props.language === 'ch2') {
        title = '總額';
        taxTitle = '稅金';
        total = '總額（包稅）';
        totalPreTax = '總額(不包稅）';
        goNext = '下一步';
        discountName = '折扣';
    } else {};

    let totalPriceNoTax =0; 
    const priceSummary = props.bookedRooms.map((booking, index) => {
        const roomType = roomType2.filter(rt => rt.type === booking.type)[0];
        let roomTypeName = roomType.name;
        if (props.language === 'jp') {roomTypeName = roomType.nameJ;} 
        totalPriceNoTax += booking.price;
        return (
            <div key={index} className='summaryLine'>
                <p className='summaryTextLeft' style={{fontSize: 18}}>{roomTypeName}</p>
                <p className='summaryTextRight' style={{fontSize: 18}}>{'JPY ' + booking.price.toLocaleString()}</p>
            </div>
        )
    })


    const discountRate = props.bookedRooms[0].discount;
    const discount = discountRate*totalPriceNoTax;
    totalPriceNoTax = totalPriceNoTax - discount;
    let totalTaxes = 0.1*(totalPriceNoTax);
    const totalPriceWithTax = totalPriceNoTax + totalTaxes;
    console.log('DISCOUNT RATE ', props.bookedRooms[0].discount);

    // the following snipet is for displaying discount
    const discountDisplay = 
                <>
                <div className='summaryLine'>
                    <p className='summaryTextLeft' style={{fontSize: 18}}>{discountName}</p>
                    <p className='summaryTextRight' style={{fontSize: 18}}>{'JPY ' + discount.toLocaleString()}</p>
                </div>
                <hr/>
                </>
        // } else {return null}
    

    const updateBookingLocal = (index) => {
        const b = props.bookedRooms[index];
        // console.log('UPDATEBookingLocal ',b);
        props.updateBooking(b);
    }

    // update currentStep and viewStep ony
    function handleClick(){
        // let b = props.booking;
        // b.currentStep = (b.currentStep === 4 ? 5 : b.currentStep);
        // b.viewStep = 5;
        // props.updateBooking(b);
        const steps = {
            currentStep: (props.steps.currentStep === 4)? 5 : props.steps.currentStep,
            viewStep: 5
        }
        props.updateSteps(steps);
    }

// onClick={()=>closeCalendar()} 
    return (
        <div className='viewPortSummary' >
            <h2 className='summaryTitle'>{title}</h2> 
            <SelectedRoomTypeSummmary language={props.language} bookedRooms={props.bookedRooms} updateBooking={(b)=>props.updateBooking(b)} deleteBookedRoom={(b)=>props.deleteBookedRoom(b)} 
            updateSteps={(s)=>props.updateSteps(s)} steps={props.steps} />
            <div className='priceSummaryBox'>
                {priceSummary}
                {discount > 0 ? discountDisplay : null}
                <div className='summaryLine'>
                    <p className='summaryTextLeft' style={{fontSize: 20}}>{totalPreTax}</p>
                    <p className='summaryTextRight' style={{fontSize: 20}}>{'JPY ' + totalPriceNoTax.toLocaleString()}</p>
                </div>
                <hr/>
                <div className='summaryLine'>
                    <p className='summaryTextLeft' style={{fontSize: 20}}>{taxTitle}</p>
                    <p className='summaryTextRight' style={{fontSize: 20}}>{'JPY ' + totalTaxes.toLocaleString()}</p>
                </div>
                <hr/>
                <div className='summaryLine'>
                    <p className='summaryTextLeft'style={{fontSize: 20}}>{total}</p>
                    <p className='summaryTextRight' style={{fontSize: 20}}>{'JPY ' + totalPriceWithTax.toLocaleString()}</p>
                </div>
            </div>
            <div className='continueButtonBox'>
                <Link to='/booking/details' className='continueButton' onClick={()=>handleClick()}>{goNext}</Link>
            </div>
            <Outlet/>
            <div className='whiteSpace'></div>
        </div>
    )
}

SelectionSummary.propTypes = {
    language: PropTypes.string,
    bookedRooms: PropTypes.array,
    updateBooking: PropTypes.func,
    updateBookedRooms: PropTypes.func
}

export default SelectionSummary;