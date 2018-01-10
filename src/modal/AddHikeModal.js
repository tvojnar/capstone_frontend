import React from 'react';
import Modal from 'react-modal';
import BaseModal from './BaseModal';
import Form from '../components/Form';
import {MapAddHike} from '../components/MapAddHike';

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
      lat: 46.6062,
      lng: -122.3321,
      modalIsOpen: true
    };
  }

// pass the Form a method to close the AddFormModal via props (hideFormModal)
// pass Form fetchHikes so that it can call the Map components fetchHikesFromApi function when the form is submitted
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
          <MapAddHike lat={this.state.lat} lng={this.state.lng} />
          <Form
            hideFormModal={this.props.hideModalFromAddHike}
            fetchHikes={this.props.fetchHikes}
          />
          <button onClick={this.props.hideModalFromAddHike}>Cancle</button>
        </Modal>
      </div>
    );
  }
}

export default AddHikeModal
