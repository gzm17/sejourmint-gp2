import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import {Modal, ModalHeader, ModalBody } from 'reactstrap';
import { GoX } from "react-icons/go";

// The following imports the components for presentation
import './GalleryPhotoFrame.css';

function GalleryPhotoFrame(props) {
    // console.log('Gallery - ', props.galleryType);
    const [toggles, setToggles] = React.useState({
        modalIsOpen: false,
        clickedImageIndex: 0
    });

    const closeModalButton = (
        <div className="closeModalButton" >
            <button onClick={()=>toggleModal(0)} type="button">
                <GoX className='crossIcon'/>
            </button>
        </div>
      );

    const photos = props.imageArray.map(image => {
        return (
            <SwiperSlide key={image.id} >
                <div>
                    {/* <img src={image.image} alt={'swiper ' + image.image} /> */}
                    <img src={image.image} id='slideFrame' className='gallerySlidesFrame' alt={'swiper ' + image.image} />
                </div>
            </SwiperSlide>
        )
    });

    function toggleModal(id) {
        // console.log('clicked index = ', id, 'modalIsOpen: ', toggles.modalIsOpen);
        setToggles({
            modalIsOpen: !toggles.modalIsOpen,
            clickedImageIndex: id })
    }

    // Below assignment is a hack: trying to print videos are coming when videos is selected, '' otherwise
    // A new component for videos will be needed, and this necessity will be gone.
    const selectedGallery = props.imageArray.map(image => {
        return (
            <div key={image.id} onClick={()=>toggleModal(image.id)} >
                <img key={image.id} src={image.image} alt={'image: ' + image.image} />
                {/* <img key={image.id} src={image.image} alt={'image: ' + image.image} /> */}
            </div>
        )
    });


    return (
        <div className='galleryPhotoFrame'>
            {/* <h2 className='title'> Gallery - {props.galleryType}</h2> */}
            {props.msg}
            {selectedGallery}

            {/* Below block renders the Modal which contains the swiper slide deck of the images */}
            <Modal isOpen={toggles.modalIsOpen} toggle={()=>toggleModal(0)} id='modal'>
                    <ModalHeader toggle={()=>toggleModal(0)} close={closeModalButton} className='modalHeadreHeight'></ModalHeader>
                    <ModalBody>
                        <div className='swiperFrame'>
                            <Swiper
                                initialSlide={toggles.clickedImageIndex}
                                cssMode={true}
                                rewind={true}
                                navigation={true}
                                pagination={true}
                                mousewheel={true}
                                keyboard={true}
                                modules={[Navigation, Pagination, Mousewheel, Keyboard]}

                                slidesPerView='1'
                                centeredSlides={true}

                                className="swiper-container" >
                            {photos}
                            </Swiper>
                        </div>
                    </ModalBody>
                </Modal>

        </div>
    )
}

export default GalleryPhotoFrame;