import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import { IoCalendarNumberOutline, IoBedOutline, IoListOutline, IoPersonOutline, IoBarChartOutline, IoCheckmark, IoChevronDownOutline, IoChevronUpOutline} from "react-icons/io5";

// The following imports the components for presentation
import './BookingHeader.css';

function BookingHeader(props) {
    // the nowStep state tracks which of the 5 steps the user is in - this info is used to alter the booker header menu
    // the viewStep state tracks what the user is looking at - note viewStep may be less than the currentStep (but not bigger than)
    // as the user cannot click future steps without completing the nowStep, can only go back. Default for both is 1 (1st step)
    // const [nowStep, setNowStep] = useState(1);
    // const [viewStep, setViewStep] = useState(1);

    const [isToBeOpen, setIsToBeOpen] = useState(true); // for sm screen contraction/expansion
    const [smallScreenTop, setSmallScreenTop] = useState(null);

    // Prepare bilingual titles
    var dates, roomTypes, rates, summary, details;
    if (props.language === 'en') {
        dates = 'Dates';
        roomTypes = 'Room Types';
        rates = 'Rates';
        summary = 'Summary';
        details = 'Details';
    } else if (props.language === 'jp') {
        dates = '日付';
        roomTypes = '部屋タイプ';
        rates = '料金';
        summary = 'サマリー';
        details = '詳細';
    } else if (props.language === 'ch1') {
        dates = '日期';
        roomTypes = '客房类型';
        rates = '房价';
        summary = '总额';
        details = '详细';
    } else if (props.language === 'ch2') {
        dates = '日期';
        roomTypes = '客房類型';
        rates = '房價';
        summary = '總額';
        details = '詳細';
    } else {};
    
    // Put symbols in vars so that they are changable 
    // console.log('After STEPS IN Header = ', props.steps.currentStep, props.steps.viewStep);
    let symbolDates = <div id='buttonDates' className='symbol'><IoCalendarNumberOutline className='bookButton' /> </div>;
    let symbolTypes = <div id='buttonTypes' className='symbol'><IoBedOutline className='bookButton' />  </div>;
    let symbolRates = <div id='buttonRates' className='symbol'><IoBarChartOutline className='bookButton' />  </div>;
    let symbolSummary = <div id='buttonSummary' className='symbol'><IoListOutline className='bookButton' />  </div>;
    let symbolDetails = <div id='buttonDetails' className='symbol'><IoPersonOutline className='bookButton' />  </div>;

    // The following block renders the top layer menu item in small screen
    // This block of code probably does not need idName as a state var to be set within useEffect. 
    // But does not seem to hurt
    const smallScreenTopMenuBar = () => {
        // console.log('nowStep = ', nowStep);
        const nowStep = props.steps.viewStep;
        let topBarName = 'Dates';
        let idName = 'dates';
        if (nowStep === 1) { idName = 'dates'; topBarName = 'Dates'; } 
        else if (nowStep === 2) { idName = 'types'; topBarName = 'Room Types'; } 
        else if (nowStep === 3) { idName = 'rates'; topBarName = 'Rates';}
        else if (nowStep === 4) { idName = 'summary'; topBarName = 'Summary';}
        else {idName = 'details'; topBarName = 'Details';}
        
        // console.log('SM XXX nowStep = ', nowStep, idName+nowStep);
        return (
            <div className='bookingHeaderMenuSmall'>
                <div className='bookingHeaderButtons'>
                    <div className='symbol'><IoCalendarNumberOutline className='bookButton' /> </div>
                    <Link id={idName + nowStep} to={idName} className='bookHeaderMenuItem'>{topBarName}</Link>
                    <div className='strike'></div>
                    <div className='nowStep'>{nowStep.toString() + '/5'}</div>
                    <div id='expandMenu' onClick={()=>setIsToBeOpen(prev=>!prev)}><IoChevronDownOutline className='symbol' /></div>
                </div>
            </div>
        )
    }

    // update color property of previously set steps when viewStep < currentStep
    useEffect(()=>{
        const view = props.steps.viewStep;
        const now = props.steps.currentStep;

        if (view < now) {
            // console.log('YYYYYY view now = ', view, now);
            if (view === 1) {
                document.getElementById('dates1').style.color = 'orange';
            } else if (view === 2 ) {
                document.getElementById('types2').style.color = 'orange';
            } else if (view === 3 ) {
                document.getElementById('rates3').style.color = 'orange';
            } else if (view === 4 ) {
                document.getElementById('summary4').style.color = 'orange';
            } else {}
        }
        // if (view === now) {
        //     if (view === 2 ){document.getElementById('types2').style.color = 'black';}
        //     else if (view === 3 ) {document.getElementById('rates3').style.color = 'black';}
        //     else if (view === 4) {document.getElementById('summary4').style.color = 'black';}
        //     else {document.getElementById('details5').style.color = 'black';}
        // }
    }, [props.steps])

    function handleViewStep(vstep){
        if (vstep <= props.steps.currentStep) {
            props.updateSteps({currentStep: props.steps.currentStep, viewStep: vstep})
        }
    }
    // This long block code changes the css and symbol types based on the props.steps values
    // useEffect only fires after DOM is rendered 
    useEffect(() => {
        // Below if -- else if --- block is for large screen
        if (props.steps.currentStep === 1){
            // console.log('IF Steps = ', props.steps.currentStep);            
            document.getElementById('types').style.pointerEvents = 'none';
            document.getElementById('rates').style.pointerEvents = 'none';
            document.getElementById('summary').style.pointerEvents = 'none';
            document.getElementById('details').style.pointerEvents = 'none';

            document.getElementById('divTypes').style.opacity = 0.5;
            document.getElementById('divRates').style.opacity = 0.5;
            document.getElementById('divSummary').style.opacity = 0.5;
            document.getElementById('divDetails').style.opacity = 0.5;

        } else if (props.steps.currentStep === 2) {
            // console.log('IF Steps = ', props.steps.currentStep);
            document.getElementById('types').style.pointerEvents = 'auto';
            document.getElementById('rates').style.pointerEvents = 'none';
            document.getElementById('summary').style.pointerEvents = 'none';
            document.getElementById('details').style.pointerEvents = 'none';

            document.getElementById('divTypes').style.opacity = 1.0;
            document.getElementById('divRates').style.opacity = 0.5;
            document.getElementById('divSummary').style.opacity = 0.5;
            document.getElementById('divDetails').style.opacity = 0.5;

            document.getElementById('dates').style.color = 'orange';
            document.getElementById('buttonDates').style.color = 'orange';
            document.getElementById('strikeDates').style.backgroundColor = 'orange';
            document.getElementById('verticalDividerDates').style.color = 'orange';

        } else if (props.steps.currentStep === 3) {
            // console.log('IF Steps = ', props.steps.currentStep);
            document.getElementById('types').style.pointerEvents = 'auto';
            document.getElementById('rates').style.pointerEvents = 'auto';
            document.getElementById('summary').style.pointerEvents = 'none';
            document.getElementById('details').style.pointerEvents = 'none';

            document.getElementById('divTypes').style.opacity = 1.0;
            document.getElementById('divRates').style.opacity = 1.0;
            document.getElementById('divSummary').style.opacity = 0.5;
            document.getElementById('divDetails').style.opacity = 0.5;

            document.getElementById('types').style.color = 'orange';
            document.getElementById('buttonTypes').style.color = 'orange';
            document.getElementById('strikeTypes').style.backgroundColor = 'orange';
            document.getElementById('verticalDividerTypes').style.color = 'orange';

        } else if (props.steps.currentStep === 4) {
            // console.log('IF Steps = ', props.steps.currentStep);
            document.getElementById('types').style.pointerEvents = 'auto';
            document.getElementById('rates').style.pointerEvents = 'auto';
            document.getElementById('summary').style.pointerEvents = 'auto';
            document.getElementById('details').style.pointerEvents = 'none';

            document.getElementById('divTypes').style.opacity = 1.0;
            document.getElementById('divRates').style.opacity = 1.0;
            document.getElementById('divSummary').style.opacity = 1.0;
            document.getElementById('divDetails').style.opacity = 0.5;

            document.getElementById('rates').style.color = 'orange';
            document.getElementById('buttonRates').style.color = 'orange';
            document.getElementById('strikeRates').style.backgroundColor = 'orange';
            document.getElementById('verticalDividerRates').style.color = 'orange';

        } else {
            // console.log('IF Steps = ', props.steps.currentStep);
            document.getElementById('types').style.pointerEvents = 'auto';
            document.getElementById('rates').style.pointerEvents = 'auto';
            document.getElementById('summary').style.pointerEvents = 'auto';
            document.getElementById('details').style.pointerEvents = 'auto';

            document.getElementById('divTypes').style.opacity = 1.0;
            document.getElementById('divRates').style.opacity = 1.0;
            document.getElementById('divSummary').style.opacity = 1.0;
            document.getElementById('divDetails').style.opacity = 1.0;

            document.getElementById('summary').style.color = 'orange';
            document.getElementById('buttonSummary').style.color = 'orange';
            document.getElementById('strikeSummary').style.backgroundColor = 'orange';
            document.getElementById('verticalDividerSummary').style.color = 'orange';
        }
        // the following is for small screen

      },[props.steps.currentStep]);

      useEffect(() => {
          const elem = document.getElementsByClassName('bookingHeaderMenuSmall')[0];
          setSmallScreenTop(elem);
      }, []);

      // below code is for expanding or contracting the small screen menu
      useEffect(() => {
          if (smallScreenTop) {
            if (isToBeOpen) {
                smallScreenTop.style.display = 'none';
                document.getElementsByClassName('bookingHeaderMenu')[0].style.display = 'flex';
            } else {
                smallScreenTop.style.display = 'flex';
                document.getElementsByClassName('bookingHeaderMenu')[0].style.display = 'none';
            } 
          }
      }, [isToBeOpen, smallScreenTop])

    // this function opens and closes the menu in small screen. Note that unlike getElementById, 
    // getElementsByClassname returns an array. Since the classname is unique, therefore [0] reference
    // this produces uncaught error, style of undefined element. Put this block in useEffect. See above
    // function expandMenu(isToBeOpen) {
    //     // console.log('Iscliked - ', isToBeOpen)
    //     if (isToBeOpen) {
    //         document.getElementsByClassName('bookingHeaderMenuSmall')[0].style.display = 'none';
    //         document.getElementsByClassName('bookingHeaderMenu')[0].style.display = 'flex';
    //     } else {
    //         document.getElementsByClassName('bookingHeaderMenuSmall')[0].style.display = 'flex';
    //         document.getElementsByClassName('bookingHeaderMenu')[0].style.display = 'none';
    //     } 
    // }
    // Below if block does not work, and produce style undefined run time error
    // if (window.innerWidth > 768) {
    //     document.getElementsByClassName('bookingHeaderMenuSmall')[0].style.display = 'none';
    //     document.getElementsByClassName('bookingHeaderMenu')[0].style.display = 'flex';
    // }

    return (
        <div id='bookingHeader' className='bookingHeaderFrame'> 
            {smallScreenTopMenuBar()}           
            <div className='bookingHeaderMenu'>
                <div id='divDates' className='bookingHeaderButtons'>
                    {symbolDates}
                    <Link id='dates' to='/booking/dates' className='bookHeaderMenuItem' onClick={()=>handleViewStep(1)}>{dates}</Link>
                    <div id='strikeDates' className='strike'></div>
                    <div id='collapseMenu' onClick={()=>setIsToBeOpen(prev=>!prev)}><IoChevronUpOutline className='symbol' /></div>
                </div> 
                <div id='verticalDividerDates' className='verticalDivider'>|</div>
                <div id='divTypes' className='bookingHeaderButtons'>
                    {symbolTypes}
                    <Link id='types' to='/booking/roomTypes' className='bookHeaderMenuItem' onClick={()=>handleViewStep(2)}>{roomTypes}</Link>
                    <div id='strikeTypes' className='strike'></div>
                </div>
                <div id='verticalDividerTypes' className='verticalDivider'>|</div>
                <div id='divRates' className='bookingHeaderButtons'>
                    {symbolRates}
                    <Link id='rates' to='/booking/rates' className='bookHeaderMenuItem' onClick={()=>handleViewStep(3)}>{rates}</Link>
                    <div id='strikeRates' className='strike'></div>
                </div>
                <div id='verticalDividerRates' className='verticalDivider'>|</div>
                <div id='divSummary' className='bookingHeaderButtons'>
                    {symbolSummary}
                    <Link id='summary' to='summary' className='bookHeaderMenuItem' onClick={()=>handleViewStep(4)}>{summary}</Link>
                    <div id='strikeSummary' className='strike'></div>
                </div>
                <div id='verticalDividerSummary' className='verticalDivider'>|</div>
                <div id='divDetails' className='bookingHeaderButtons1'>
                    {symbolDetails}
                    <Link id='details' to='details' className='bookHeaderMenuItem' onClick={()=>handleViewStep(5)}>{details}</Link>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default BookingHeader;