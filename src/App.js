// import other packages
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import home grown app components 
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactUs from './components/ContactUs';
import GalleryHeader from './components/gallery/GalleryHeader';
import GalleryPhotoFrame from './components/gallery/GalleryPhotoFrame';
import BookingHeader from './components/booking/BookingHeader';
import SelectDates from './components/booking/SelectDates';
import SelectRoomType from './components/booking/SelectRoomType';
import SelectRates from './components/booking/SelectRates';
import SelectionSummary from './components/booking/SelectionSummary';

// import data
import {gallery} from './data/gallery/gallery';

import './App.css';
import CommitBooking from './components/booking/CommitBooking';


export default function App() {

  // vars for chkin / chkout dates, # of guests, selected room types, and booking progression - where in booking steps
  // the currentStep state tracks which of the 5 steps the user is in - this info is used to alter the booker header menu
  // the viewingStep state tracks what the user is looking at - note viewingStep may be less than the currentStep (but not bigger than)
  // as the user cannot click future steps without completing the currentStep, can only go back. Default for both is 1 (1st step)
  const currentDate = new Date();
  const [booking, setBooking] = useState({
    guestId: 0,
    checkin: new Date(currentDate), // if I do not add new Date(), checkin is treated as a number...
    checkout: new Date(currentDate.setDate(currentDate.getDate() + 3)), //... does not get date methods
    adults: 2,
    kids: 0,
    type: 'standard1',
    typeId: 4,
    typeName: 'Standard Room - 1',
    typeNameJ: '標準部屋ー１',
    instruction: '',
    rateId: 3,
    rate: 'basic',
    rateName: 'Best Rate Plan',
    rateNameJ: '最安プラン',
    price: 0,
    promoCode: '',
    discountId: 0,
    discount: 0
    // currentStep: 1,
    // viewingStep: 1
  });

  // State vars for holding remaining capacity of the room types, which is 
  // This Block includes: def of the state vars and function getAvailableRooms
  // Function is only run after each date periods are chosen in SelectDates
  const [availableRooms, setAvailableRooms] = useState([]);

  const getAvailableRooms = async (date1, date2) => {
    const params = {date1: date1, date2: date2};
    // const searchParams = new URLSearchParams(params);
      try {
        // const response = await fetch('http://localhost:3001/availableRooms?${searchParams}', {
        const response = await fetch('http://localhost:3001/availableRooms', {
            method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({date1: date1, date2: date2}),
        });
        const jsonData = await response.json();
        // console.log(jsonData);
        setAvailableRooms(jsonData);
      } catch (error) {
        console.error(error);
      }
  };

  // bookedRooms contains multiple bookings a user can make
  const [bookedRooms, setBookedRooms] = useState([]);

  // steps is the state var that keeps track if where the user is in the booking and is used, and 
  // this info is used to present the top booking selection menu bar
  const [steps, setSteps] = useState({
    currentStep: 1,
    viewStep: 1
  });

  const updateSteps = (s) => {
    setSteps(s);
    // console.log('Before STEPS = ', steps.currentStep, steps.viewStep);
  }
  // console.log('STEPS in APP = ', steps.currentStep, steps.viewStep);

  // This function updates the booking after user selects. Called from App's child components
  const updateBooking = (booking) => {
    setBooking(booking);
    // console.log('VVVVV booking = ', booking);
    // console.log('booking updated in App', booking.checkin, booking.checkout, booking.adults, booking.kids, booking.currentStep, booking.type, booking.rate, booking.instruction);
  }

  // Each booking can have multiple rooms with each room info represented by booking (state var). After each commitm booking is added to bookedRooms array
  const addRoom = (booking) => {
    let b = bookedRooms;
    let b1 = Object.assign({}, booking); // create clone of booking, assign to b1
    b.push(b1);
    setBookedRooms(b);
  }

  // refreshBBookedRooms recopy the entire array of bookings. This is needed when partial contents
  // are updated during queries with the databbase, such as guestIds 
  const refreshBookedRoom = (rooms) => {
    // console.log('COMMMIT in APP refreshBookedRooms = ', rooms);
    setBookedRooms(rooms);
  }

  // this function delete the booking from bookedRooms with given index
  const deleteBookedRoom = (index) => {
    // setBookedRooms(prevArray => [...br]);
    setBookedRooms(prevArray => prevArray.filter((element, ind) => ind !== index ));
    // console.log('Spliced ARRAY Called ', index);
  }
  // console.log('bookedRooms = ', bookedRooms);

    // console.log('booking updated in App', booking.checkin, booking.checkout, booking.adults, booking.kids, booking.currentStep, booking.type, booking.rate, booking.instruction);

  // define language with EN as default - this can be changed to season based: snow season - EN, rest - JP
  const [language, setLanguage] = useState('en');
  // console.log('XXX OUTSIDE language = ', language);
  const changeLanguage = (lang) => {
    // console.log('XXX INSIDE language and lang = ', language, lang);
    if(lang !== language ) {
      if (lang === 'en' ) { 
        setLanguage('en'); 
      } else if (lang === 'jp' ) { 
        setLanguage('jp');
      } else if (lang === 'ch1' ) { 
        setLanguage('ch1');
      } else { 
        setLanguage('ch2');
      } 
    }
  }

  // Update contactHeading - Note: embedding this within chnageLanguage does not work due to async update
  var contactHeading = '';
  if (language === 'en' ) { 
    contactHeading = 'Contact Us';
  } else if (language === 'jp' ) { 
    contactHeading = '問合せ';
  } else if (language === 'ch1' ) { 
    contactHeading = '与我们联系';
  } else if (language === 'ch2' ) { 
    contactHeading = '與我們聯繫';
  } else {};

  const videosMsg = <p>Videos are coming soon.</p>;

  return (
      <BrowserRouter>
        <div className="App">
          <Header changeLanguage={changeLanguage} language={language}/>
          <Routes>
            {/* <Route path='/' element={<Header />} /> */}
            <Route index element={<Main language={language}/>} />
            <Route path='booking' element={<BookingHeader language={language} booking={booking} steps={steps} updateSteps={(s)=>updateSteps(s)} />} >
                {/* Embedded sub-routes under booking */ }
                <Route index element={<SelectDates language={language} booking={booking} updateBooking={(b)=>updateBooking(b)} steps={steps} updateSteps={(s)=>updateSteps(s)} />} />

                <Route path='dates' element={<SelectDates language={language} booking={booking} updateBooking={(b)=>updateBooking(b)} steps={steps} updateSteps={(s)=>updateSteps(s)}/>} />

                <Route path='roomTypes' element={<SelectRoomType language={language} booking={booking} updateBooking={(b)=>updateBooking(b)} steps={steps} updateSteps={(s)=>updateSteps(s)} availableRooms={availableRooms} getAvailableRooms={(d1, d2)=>getAvailableRooms(d1,d2)}/>} />

                <Route path='rates' element={<SelectRates language={language} booking={booking} updateBooking={(b)=>updateBooking(b)} addRoom={(b)=>addRoom(b)} steps={steps} updateSteps={(s)=>updateSteps(s)} />} />

                <Route path='summary' element={<SelectionSummary language={language} bookedRooms={bookedRooms} updateBooking={(b)=>updateBooking(b)} deleteBookedRoom={(b)=>deleteBookedRoom(b)} steps={steps} updateSteps={(s)=>updateSteps(s)} />} />

                <Route path='details' element={<CommitBooking language={language} bookedRooms={bookedRooms} refreshBookedRooms={(rms) => refreshBookedRoom(rms)} steps={steps} updateSteps={(s)=>updateSteps(s)} />} />

            </Route>

            <Route path='gallery' element={<GalleryHeader language={language} />} >
              {/* Embedded sub-routes under gallery */ }
              <Route index element={<GalleryPhotoFrame msg={''} imageArray={gallery[0].images} language={language} />} />
              <Route path='hotel' element={<GalleryPhotoFrame msg={''} imageArray={gallery[0].images} language={language} />} />
              <Route path='rooms' element={<GalleryPhotoFrame msg={''} imageArray={gallery[1].images} language={language} />} />
              <Route path='winter' element={<GalleryPhotoFrame msg={''} imageArray={gallery[2].images} language={language} />} />
              <Route path='spring' element={<GalleryPhotoFrame msg={''} imageArray={gallery[3].images} language={language} />} />
              <Route path='summer' element={<GalleryPhotoFrame msg={''} imageArray={gallery[4].images} language={language}/>} />
              <Route path='fall' element={<GalleryPhotoFrame msg={''} imageArray={gallery[5].images} language={language} />} />
              <Route path='videos' element={<GalleryPhotoFrame msg={videosMsg} imageArray={[]} language={language} />} />
            </Route>

            <Route path='*' element={<></>} />
          </Routes>
          {/* <Header />
          <Main /> */}
          <ContactUs ids='contactUs' title={contactHeading} language={language} />
          <Footer changeLanguage={changeLanguage} language={language} />
        </div>
      </BrowserRouter>
    );
  }
