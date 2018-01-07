import React from 'react';
import Modal from 'react-modal';
import BaseModal from './BaseModal';
import Form from '../components/Form';

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
          <Form />
          <button onClick={this.props.hideModalFromAddHike}>Cancle</button>
        </Modal>
      </div>
    );
  }
}

export default AddHikeModal
