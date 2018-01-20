import React from 'react';
import Modal from 'react-modal';
import BaseModal from './BaseModal'
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

// SuccessModal is a child class of BaseModal
class SuccessModal extends BaseModal {

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = 'green';
  }


  closeModal() {
    // make the success modal dissapear
    this.setState({modalIsOpen: false});
    // make the form modal close
    this.props.hideFormModal();
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
          <h2 >Your hike was successfully saved!</h2>
          <Button className='blueButton' onClick={this.closeModal}>Close</Button>
        </Modal>
      </div>
    );
  }
}

export default SuccessModal
