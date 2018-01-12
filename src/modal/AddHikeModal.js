import React from 'react';
import Modal from 'react-modal';
import BaseModal from './BaseModal';
import FormContainer from '../containers/FormContainer'

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

  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: true,
    };

  }



// pass FormContainer fetchHikes so that it can pass it to Form to call the Map components fetchHikesFromApi function when the form is submitted
// pass FormContainer hideModalFromAddHike so that it can close the AddHikeModal
// pass FormContainer whichForm = 'add' so that it will render Form.js not EditForm.js
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
          <FormContainer
            fetchHikes={this.props.fetchHikes}
            hideModalFromAddHike={this.props.hideModalFromAddHike}
            whichForm={'add'}/>
          <button onClick={this.props.hideModalFromAddHike}>Cancle</button>
        </Modal>
      </div>
    );
  }
}

export default AddHikeModal
