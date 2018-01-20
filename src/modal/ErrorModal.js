import React from 'react';
import Modal from 'react-modal';
import BaseModal from './BaseModal';
import '../foundation.css';
import {Button} from 'react-foundation';
import '../App.css';

// sets the portion of the app that should be hidden
Modal.setAppElement('#root');
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  },
  overlay : {
    backgroundColor   : 'transparent'
  }
};

// ErrorModal is a child class of BaseModal
class ErrorModal extends BaseModal {

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // change the h2 color to red
    this.subtitle.style.color = 'red';
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Sorry, your hike failed to save</h2>
          <p>Please try again</p>
          <Button className='blueButton' onClick={this.closeModal}>Close</Button>
        </Modal>
      </div>
    );
  }
}

export default ErrorModal
