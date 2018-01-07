import React from 'react';
import Modal from 'react-modal';
import BaseModal from './BaseModal'

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
  }
};

// SuccessModal is a child class of BaseModal
class AddHikeModal extends BaseModal {

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'green';
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

          <h2 ref={subtitle => this.subtitle = subtitle}>YForm would be here</h2>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}

// TODO: finish up editing this form and then import it into AddHike and get it to render on click
export default AddHikeModal
