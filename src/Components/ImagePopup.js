

import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './Home.css';


function ImagePopup({imageUrl, show, onHide}) {
    return (
        <Modal
            isOpen={show}
            toggle={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalHeader closeButton>
                Full Image of the issue
            </ModalHeader>
            <ModalBody>
                <img  src={imageUrl} alt="imageUrl" width="1080" />
            </ModalBody>
            <ModalFooter>
                <Button className='button-background-color' onClick={onHide}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}


export default ImagePopup;