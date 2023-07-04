import React, { useState } from 'react';
import Modal from 'react-modal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaImage} from 'react-icons/fa';
import { ModalHeader } from 'reactstrap';
import './ModalPopup.css'

Modal.setAppElement("#root")

const ImageCarouselModal = ({ images }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [carouselImages, setCarouselImages] = useState([]);
  
    const openModal = () => {
    //   setCurrentImageIndex(index);
      handleSettingCarouselImages(images)
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };

    const handleSettingCarouselImages = (data) => {
      // const imgList = [];
      // for(var x in data){
      //     //contains comma seperated image URL
      //     imgList.push(data.split(','))
      //     console.log("imgsss : ",data[x].images.split(','));
      // }
      setCarouselImages(data.split(','));
    }

    const CustomPrevArrow = (props) => {
        const { className, onClick } = props;
        return (
          <div
            className={className}
            onClick={onClick}
            style={{
              ...arrowStyle,
              left: '10px', // Adjust the position of the left arrow
            }}
          />
        );
      };

      const CustomNextArrow = (props) => {
        const { className, onClick } = props;
        return (
          <div
            className={className}
            onClick={onClick}
            style={{
              ...arrowStyle,
              right: '10px', // Adjust the position of the right arrow
            }}
          />
        );
      };

      const arrowStyle = {
        width: 'auto',
        height: 'auto',
        background: 'black', // Change the arrow color here
        borderRadius:'50%'
      };
  
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots) => (
            <div>
              <br/>
              <ul style={{ margin: "0px", padding: "0px" }}>{dots}</ul>
              <style>
                {`
                  .slick-dots li button:before {
                    color: black; /* Change the arrow color here */
                  }
                `}
              </style>
            </div>
          ),
            prevArrow: <CustomPrevArrow />,
            nextArrow: <CustomNextArrow />,
    };

    
  
    return (
      <div>
        <FaImage className='FaImage-' onClick={openModal} />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Image Modal"
        >
          <ModalHeader>
            <h3>Attachments</h3>
          </ModalHeader>
          <button className="button-background-color" style={{position:'absolute',top:'10px',right:'10px'}} onClick={closeModal}>Close</button>
          {carouselImages.length > 0?
          
            <Slider {...settings}>
              {carouselImages.map((image, index) => (
                <div key={index}>
                  <img src={image} style={{height:'400px', width:'auto', margin:'0 auto'}} alt={`Image`} />
                </div>
              ))}              
            </Slider>
            :
            <h5 style={{margin:'0 auto'}}>No attachments</h5>
          }
        </Modal>
      </div>
    );
  };

export default ImageCarouselModal