import React from 'react';
import Modal from 'react-modal';
import BaseModal from './BaseModal';
import Form from '../components/Form';
import {MapAddHike} from '../components/MapAddHike';
import SetPinForm from '../components/SetPinForm';

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
      modalIsOpen: true,
      enteredName: false,
      hikeName: '',
    };

    this.setName = this.setName.bind(this);
  }

  setName(name) {
    console.log('in setName and name is:');
    console.log(name);
    this.setState({hikeName: name})
  }

// pass the Form a method to close the AddFormModal via props (hideFormModal)
// pass Form fetchHikes so that it can call the Map components fetchHikesFromApi function when the form is submitted
  render() {
    console.log('in render for MapAddModal and name is:');
    console.log(this.state.hikeName);
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <SetPinForm setName={this.setName}/>
          <MapAddHike
              lat={this.state.lat}
              lng={this.state.lng}
              enteredName={this.state.enteredName}/>
          <Form
            hideFormModal={this.props.hideModalFromAddHike}
            fetchHikes={this.props.fetchHikes}
            hikeName={this.state.hikeName}
          />
          <button onClick={this.props.hideModalFromAddHike}>Cancle</button>
        </Modal>
      </div>
    );
  }
}

export default AddHikeModal
