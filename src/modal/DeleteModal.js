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
class DeleteModal extends BaseModal {

  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this);
  }



  closeModal() {
    // make the success modal dissapear
    this.setState({modalIsOpen: false});
    // make the form modal close
    // this.props.hideFormModal();
  }

  handleDelete() {
    // call the deleteHike() function in HikeDetailsModal
    this.props.deleteHike();
    // close the modal
    this.setState({modalIsOpen: false});
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
          <h2 >Are you sure you want to delete this hike?</h2>
          <Button className='greenButton' onClick={this.handleDelete}>Yes</Button>
          <Button className='redButton' onClick={this.closeModal}>Cancel</Button>
        </Modal>
      </div>
    );
  }
}

export default DeleteModal
